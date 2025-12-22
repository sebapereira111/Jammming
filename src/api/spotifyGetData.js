import { spotifyAuthPKCE } from "./spotifyAuthPKCE";

// Pedimo a Spotify el id de usuario
async function getUserId(tokens, setTokens){
    try {
        // Primero refrescamos nuestros token
        const freshTokens = await spotifyAuthPKCE.refreshToken(tokens, setTokens);

        // Solicitamos el id a Spotify
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${freshTokens.accessToken}`
            }
        });

        // Si la respuesta es error (fuera de 200)
        if(!response.ok){
            const errorBody = await response.json().catch(() => null);
            throw new Error(`Status: ${response.status} Texto: ${response.statusText} Detalle: ${JSON.stringify(errorBody)}`);
        }

        const data = await response.json();
        return(data.id);
    } catch(error){
        console.error("Error en getUserId", error);
        throw error;
    }
}

async function getTracks(buscar, tokens, setTokens) {
    // Definimos que se pidan 10 resultados a Spotify
    const cant = 10;

    try {
        // Primero refrescamos nuestros token
        const freshTokens = await spotifyAuthPKCE.refreshToken(tokens, setTokens);

        // Solicitamos las musicas a Spotify de acuerdo a el termino de busqueda
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(buscar)}&limit=${encodeURIComponent(String(cant))}&locale=es_LA`, {
        headers: {
            Authorization: `Bearer ${freshTokens.accessToken}`
        }
        });

        // Si la respuesta es error (fuera de 200)
        if (!response.ok) {
            const errorBody = await response.json().catch(() => null);
            throw new Error(`Status: ${response.status} Texto: ${response.statusText} Detalle: ${JSON.stringify(errorBody)}`);
        }

        const data = await response.json();
        return data;
    } catch(error) {
        console.error("Error en getTracks", error);
        throw error;
    }
}

async function getOffset(url, tokens, setTokens) {
    try {
        // Primero refrescamos nuestros token
        const freshTokens = await spotifyAuthPKCE.refreshToken(tokens, setTokens);

        // Solicitamos las musicas a Spotify de acuerdo a el termino de busqueda
        const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${freshTokens.accessToken}`
        }
        });

        // Si la respuesta es error (fuera de 200)
        if (!response.ok) {
            const errorBody = await response.json().catch(() => null);
            throw new Error(`Status: ${response.status} Texto: ${response.statusText} Detalle: ${JSON.stringify(errorBody)}`);
        }

        const data = await response.json();
        return data;
    } catch(error) {
        console.error("Error en getOffset", error);
        throw error;
    }
}

export const spotifyGetData = { getUserId, getTracks, getOffset };

/*
> Funcion para obtener el usuario >>> getUserId()
    - Recibe tokens y setTokens
    - Retorna userId
> Funcion para pedir tracks >>> getTracks()
    - Recibe termino de busqueda, tokens y setTokens
    - Retorna datos de tracks (como envio Spotify pero ya un objeto(parseado))
> Funcion para pedir tracks offset >>> getOffset()
    - Recibe url, tokens y setTokens
    - Retorna datos de tracks (como envio Spotify pero ya un objeto(parseado))
*/