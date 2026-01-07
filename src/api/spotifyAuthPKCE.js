import { spotifyGetData } from "./spotifyGetData";

// Funciones auxiliares para PKCE
// Code Verifier from Spotify
const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

// Code Challenge from Spotify
const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

// base64 representation from Spotify
const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// Genera el code challenge PKCE usando las funciones auxiliares
async function generateCodeChallenge() {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    
    // Almacenamos el codeVerifier para usarlo despues
    localStorage.setItem("spotify_code_verifier", codeVerifier);
    
    return codeChallenge;
}

// Restauracion de los tokens del localstorage
async function restoreFromStorage(setTokens) {
    const data = localStorage.getItem("spotify_auth_data");
    if (data) {
        try {
            const parse = JSON.parse(data);
            const tokens = {
                accessToken: parse.accessToken,
                refreshToken: parse.refreshToken,
                expiresAt: parse.expiresAt,
            };
            setTokens(tokens);
            const userId = await spotifyGetData.getUserId(tokens, setTokens);
            // Retorna el usuario
            return userId;
        } catch (error) {
            console.error("Error en restoreFromStorage:", error);
            localStorage.removeItem("spotify_auth_data");
            throw new Error(`Error de inicio de sesion. Error: ${error.message}`);
        }
    } else {
        return false;
    }
}

// Redirect to Spotify authorization
async function authorizePKCE() {
    // Generamos el code challenge
    const codeChallenge = await generateCodeChallenge();

    // Generamos el state (recomendado) y lo almacenamos para uso posterior
    const state = generateRandomString(16);
    localStorage.setItem("spotify_auth_state", state);

    // Los datos locales que vamos a usar
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

    // El scope que vamos a solicitar
    const scopes = [
        "playlist-modify-public",
        "playlist-modify-private",
        "user-read-private",
        "user-read-email",
    ];

    // URL y parametros
    const authUrl = new URL(import.meta.env.VITE_SPOTIFY_AUTH_URL);
    const params =  {
        response_type: 'code',
        client_id: clientId,
        scope: scopes.join(' '),
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
        state: state,
    }
    
    // Conectamos a Spotify para solicitar autorizacion
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}

// Gestionamos el callback y solicitamos los tokens
async function handleCallback() {
    // Extraemos los parametros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const error = urlParams.get("error");

    try {
        // Si tenemos algun error en el callback (en los parametros de la URL)
        if (error) {
            throw new Error(`Error de autorizacion: ${error}`);
        }

        // Si no hay codigo no es un callback
        if (!code) {
            return false;
        }

        // Verificamos el state por seguridad
        const storedState = localStorage.getItem("spotify_auth_state");
        if (state !== storedState) {
            throw new Error("Parametro state no coincide, posible problema de seguridad");
        }

        // Recuperamos el code verifier e intercambiamos el code por los tokens
        const codeVerifier = localStorage.getItem("spotify_code_verifier");
        if (!codeVerifier) {
            throw new Error("No se encuentra el codeVerifier");
        }
        const newTokens = await getToken(code, codeVerifier);
        
        // Borramos valores guardados usados en el callback
        localStorage.removeItem("spotify_code_verifier");
        localStorage.removeItem("spotify_auth_state");
        
        // Limpiamos la URL
        window.history.replaceState({}, document.title, window.location.pathname);

        // Retorna los tokens
        return newTokens;
    } catch(error) {
        localStorage.removeItem("spotify_code_verifier");
        localStorage.removeItem("spotify_auth_state");
        window.history.replaceState({}, document.title, window.location.pathname);
        console.error("Error en handleCallback:", error);
        throw error;
    }
}

// Solicitud de token con el code recibido
async function getToken(code, codeVerifier) {
    // Los datos locales que vamos a usar
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

    // Los datos para la solicitud
    const url = import.meta.env.VITE_SPOTIFY_TOKEN_URL;
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
    };

    try {
        // Solicitamos los tokens
        const response = await fetch(url, payload);

        // Si la respuesta da error
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        
        const responseBody = await response.json();

        // Cargamos los valores en un objeto
        const tokens = {
            accessToken: responseBody.access_token,
            refreshToken: responseBody.refresh_token,
            expiresAt: Date.now() + (responseBody.expires_in * 1000),
        }

        // Se almacenan para uso posterior solo en DEV
        if (import.meta.env.DEV) {
            localStorage.setItem('spotify_auth_data', JSON.stringify(tokens));
        }

        // Se retornan los tokens
        return tokens;
    } catch (error) {
        console.error("Error en getToken", error);
        throw error;
    }
}

// Refresca los tokens si ya vencio
async function refreshToken(oldTokens, setTokens) {
    // Primero vemos si nuestros tokens han expirado (con 5 minutos de margen)
    // Si no han expirado retornamos
    if (oldTokens.expiresAt > (Date.now() - 300000)) {
        return oldTokens;
    }

    // Los datos locales que vamos a usar
    const clientId = import.meta.env.VITE_CLIENT_ID;

    // Los datos para la solicitud
    const url = import.meta.env.VITE_SPOTIFY_TOKEN_URL;
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: oldTokens.refreshToken,
            client_id: clientId
        }),
    }

    try {
        // Solicitamos refrescar los token
        const response = await fetch(url, payload);

        // Si la respuesta da error
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }


        const responseBody = await response.json();

        // Cargamos los valores en un objeto
        const tokens = {
            accessToken: responseBody.access_token,
            refreshToken: responseBody.refresh_token ? responseBody.refresh_token : oldTokens.refresh_token,
            expiresAt: Date.now() + (responseBody.expires_in * 1000),
        }

        // Se almacenan para uso posterior solo en DEV
        if (import.meta.env.DEV) {
            localStorage.setItem('spotify_auth_data', JSON.stringify(tokens));
        }

        // Se guardan los nuevos tokens
        setTokens(tokens);

        // Se retornan los nuevos tokens para su uso inmediato
        return tokens;
    } catch(error) {
        console.error("Error en refreshToken", error);
        throw error;
    }
}

export const spotifyAuthPKCE = { restoreFromStorage, authorizePKCE, handleCallback, refreshToken };


/*
VARIABLES IMPORTANTES
> tokens >>> objeto {accessToken, refreshToken, expiresAt}
> setOnCallback >>> bandera que bloquea duplicacion de funcion para manejar callback (de User)
> setTokens >>> objeto tokens (de App)
> setUser >>> nombre de usuario logueado
> codeVerifier >>> se genera para la solicitud original a Spotify (guardado en localstorage)
> state >>> se utiliza en la solicitud original a Spotify (guardado localstorage)
> code >>> codigo de autorizacion que envia Spotify y se usa para pedir token

> Funciones auxiliares
    > generateRandomString
    > sha256
    > base64encode
    > generateCodeChallenge
> Funcion que restaura de storage >>> restoreFromStorage()
    - Recibe setTokens y setUser
    - Retorna el usuario o false
> Funcion que redirecciona a Spotify para la autorizacion >>> authorizePKCE()
    - No recibe ni retorna nada
> Funcion para manejar el callback de Spotify >>> handleCallback()
    - Recibe nada
    - Retorna tokens o false
> Funcion para conseguir los tokens >>> getToken()
    - Recibe code y codeVerifier
    - Retorna tokens
> Funcion para refrescar los tokens >>> refreshTokens()
    - Recibe tokens viejos y setTokens
    - Retorna tokens (refrescados o los viejos)

*/