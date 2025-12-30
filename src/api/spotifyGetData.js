import { spotifyAuthPKCE } from "./spotifyAuthPKCE";

// Peticion de usuario a Spotify
async function getUserId(tokens, setTokens){
    try {
        // Primero refrescamos nuestros token
        const freshTokens = await spotifyAuthPKCE.refreshToken(tokens, setTokens);

        // Solicitamos el id a Spotify
        const url = import.meta.env.VITE_SPOTIFY_API_ENDPOINT + "/me";
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${freshTokens.accessToken}`
            }
        });

        // Si la respuesta es error (fuera de 200)
        if(!response.ok){
            const error = (await response.json()).error;
            throw new Error(`Status: ${error.status} Message: ${error.message}`);
        }

        // Se retorna el id (string)
        const data = await response.json();
        return(data.id);
    } catch(error){
        console.error("Error en getUserId", error);
        throw error;
    }
}

// Busqueda de tracks
async function getTracks(q, limit, tokens, setTokens) {
    try {
        // Primero refrescamos nuestros token
        const freshTokens = await spotifyAuthPKCE.refreshToken(tokens, setTokens);

        // Definimos la URL a usar
        const url = import.meta.env.VITE_SPOTIFY_API_ENDPOINT + `/search?type=track&q=${encodeURIComponent(q)}&limit=${encodeURIComponent(String(limit))}&locale=es_LA`;
        // Solicitamos las musicas a Spotify de acuerdo a el termino de busqueda
        const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${freshTokens.accessToken}`
        }
        });

        // Si la respuesta es error (fuera de 200)
        if (!response.ok) {
            const error = (await response.json()).error;
            throw new Error(`Status: ${error.status} Message: ${error.message}`);
        }

        // Retornamos un objeto con los datos de los resultados
        const data = await response.json();
        return data;
    } catch(error) {
        console.error("Error en getTracks", error);
        throw error;
    }
}

// Navegar a next o prev entre los resultados
async function moreTracks(url, tokens, setTokens) {
    try {
        // Primero refrescamos nuestros token
        const freshTokens = await spotifyAuthPKCE.refreshToken(tokens, setTokens);

        // Solicitamos las musicas a Spotify de acuerdo a el url recibido
        const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${freshTokens.accessToken}`
        }
        });

        // Si la respuesta es error (fuera de 200)
        if (!response.ok) {
            const error = (await response.json()).error;
            throw new Error(`Status: ${error.status} Message: ${error.message}`);
        }

        // Retornamos un objeto con los datos de los resultados
        const data = await response.json();
        return data;
    } catch(error) {
        console.error("Error en moreTracks", error);
        throw error;
    }
}

export const spotifyGetData = { getUserId, getTracks, moreTracks };

/*
> Funcion para obtener el usuario >>> getUserId()
    - Recibe tokens y setTokens
    - Retorna userId
> Funcion para pedir tracks >>> getTracks()
    - Recibe termino de busqueda q, limite(cantidad), tokens y setTokens
    - Retorna datos de tracks (como envio Spotify pero ya un objeto(parseado))
> Funcion para pedir mas tracks del ultimo termino de busqueda >>> moreTracks()
    - Recibe termino de busqueda url, tokens y setTokens
    - Retorna datos de tracks (como envio Spotify pero ya un objeto(parseado))
*/