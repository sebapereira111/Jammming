import { spotifyAuthPKCE } from "./spotifyAuthPKCE";
import { spotifyGetData } from "./spotifyGetData";

async function createPlaylist(playlistName, tokens, setTokens) {
    try {
        // Primero refrescamos nuestros token
        const freshTokens = await spotifyAuthPKCE.refreshToken(tokens, setTokens);
        
        // Despues construimos nuestra URL
        const user = await spotifyGetData.getUserId(tokens, setTokens);
        const url = import.meta.env.VITE_SPOTIFY_API_ENDPOINT + `/users/${user}/playlists`;
        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${freshTokens.accessToken}`
            },
            body: JSON.stringify({
                name: playlistName,
                public: false,
                description: "Created on Jammming"
            }),
        };

        // Por ultimo enviamos la solicitud
        const response = await fetch(url, payload);

        // Si la respuesta es error (fuera de 200)
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();
        return data.id;
    } catch(error) {
        console.error("Error en createPlaylist", error);
        throw error;
    }
}
    
async function addToPlaylist(playlistId, listaDeMusicas, tokens, setTokens) {
    try {
        // Primero refrescamos nuestros token
        const freshTokens = await spotifyAuthPKCE.refreshToken(tokens, setTokens);

        // Creamos el array de musicas a guardar
        const listaDeUris = listaDeMusicas.map((musica) => musica.id);

        // Despues construimos nuestra URL
        const url = import.meta.env.VITE_SPOTIFY_API_ENDPOINT + `/playlists/${playlistId}/tracks`;
        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${freshTokens.accessToken}`
            },
            body: JSON.stringify({
                "uris": listaDeUris
            }),
        };

        // Por ultimo enviamos la solicitud
        const response = await fetch(url, payload);

        // Si la respuesta es error (fuera de 200)
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }

        return true;
    } catch(error) {
        console.error("Error en addToPlaylist", error);
        throw error;
    }
}

export const spotifyPutData = { createPlaylist, addToPlaylist };

/*
> Funcion para crear la playlist >>> createPlaylist
    - Recibe playlistName, tokens y setTokens
    - Retorna playlist ID
> Funcion para agregar una lista de musicas a un playlist >>> addToPlaylist
    - Recibe playlistId, listaDeMusicas, tokens y setTokens
    - Retorna nada

*/