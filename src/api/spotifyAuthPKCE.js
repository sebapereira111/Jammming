import { spotifyGetData } from "./spotifyGetData";


// Restauracion de los tokens del localstorage
function restoreFromStorage(setTokens, setIsAuthenticated, setUser) {
    const data = localStorage.getItem('spotify_auth_data');
    if (data) {
        try {
            const parsed = JSON.parse(data);
            setTokens({
                accessToken: parsed.accessToken,
                refreshToken: parsed.refreshToken,
                expiresAt: parsed.expiresAt,
            })
            setIsAuthenticated(true);
            spotifyGetData.getUserId(parsed, setUser);
        } catch (error) {
            console.error('Error parsing stored auth data:', error);
            localStorage.removeItem('spotify_auth_data');
        }
    }
}

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

// Generate PKCE code challenge
// Genera el code challenge usando las funciones auxiliares
async function generateCodeChallenge() {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    
    // Store code verifier for later use
    localStorage.setItem('spotify_code_verifier', codeVerifier);
    
    return codeChallenge;
}

// Redirect to Spotify authorization
async function authorizePKCE() {
    // Generamos el code challenge
    const codeChallenge = await generateCodeChallenge();

    // Generamos el state (recomendado) y lo almacenamos 
    const state = generateRandomString(16);
    localStorage.setItem('spotify_auth_state', state);

    // Los datos locales que vamos a usar
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

    // El scope que vamos a solicitar
    const scopes = [
        'playlist-modify-public',
        'playlist-modify-private',
        'user-read-private',
        'user-read-email',
    ];

    // URL y parametros
    const authUrl = new URL("https://accounts.spotify.com/authorize");
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

// Handle the callback and exchange code for tokens
async function handleCallback(setOnCallback, setTokens, setIsAuthenticated, setUser) {
    // Extraemos los parametros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    try {
        // Si tenemos algun error en el callback (en los parametros de la URL)
        if (error) {
            console.error('Authorization error:', error);
            throw new Error(`Authorization failed: ${error}`);
        }

        // Si no hay codigo no es un callback
        if (!code) {
            return ;
        }

        // Verificamos el state por seguridad
        const storedState = localStorage.getItem('spotify_auth_state');
        if (state !== storedState) {
            throw new Error('State parameter mismatch - potential security issue');
        }

        // Bloqueamos la ejecucion del callback mientras esperamos a conseguir el token
        setOnCallback(true);
        // Recuperamos el code verifier e intercambiamos el code por los tokens
        const codeVerifier = localStorage.getItem('spotify_code_verifier');
        if (!codeVerifier) {
            throw new Error('Code verifier not found');
        }
        const tokens = await getToken(code, codeVerifier);
        
        // Borramos valores guardados usados en el callback
        localStorage.removeItem('spotify_code_verifier');
        localStorage.removeItem('spotify_auth_state');
        
        // Limpiamos la URL
        window.history.replaceState({}, document.title, window.location.pathname);

        setTokens(tokens);

        setIsAuthenticated(true);

        spotifyGetData.getUserId(tokens, setUser);

        setOnCallback(false);

        return true;
    } catch(error) {
        console.log("Error capturado:", error.message);
        setTokens({
                accessToken: null,
                refreshToken: null,
                expiresAt: null,
            });
        setIsAuthenticated(false);
        setUser('Iniciar Sesion');
    }
}

async function getToken(code, codeVerifier) {
    // Los datos locales que vamos a usar
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

    // Los datos para la solicitud
    const url = "https://accounts.spotify.com/api/token";
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
        const body = await fetch(url, payload);

        // Si la respuesta da error
        if (!body.ok) {
            const errorData = await body.json();
            throw new Error(`Token exchange failed: ${errorData.error_description || errorData.error}`);
        }
        
        const response = await body.json();

        // Cargamos los valores en un objeto
        const tokens = {
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            expiresAt: Date.now() + (response.expires_in * 1000),
        }

        // Se almacenan para uso posterior
        localStorage.setItem('spotify_auth_data', JSON.stringify(tokens));

        // Se retornan los tokens
        return tokens;
    } catch (error) {
        // Si el fetch da error
        console.error('Error exchanging code for tokens:', error);
        throw error;
    }
}

export const spotifyAuthPKCE = { restoreFromStorage, authorizePKCE, handleCallback };

