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

async function getTracks(buscar, tokens) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(buscar)}&limit=10`, {
        headers: {
            Authorization: `Bearer ${tokens.accessToken}`
        }
        });
        const data = await response.json();
        if (!response.ok) {
            const err = new Error('Error de getTracks');
            err.status = response.status;
            throw err;
        }
        return data;
    } catch(error) {
        throw error;
    }
}

export const spotifyGetData = { getUserId, getTracks };

/*
> Funcion para obtener el usuario >>> getUserId()
    - Recibe tokens y setTokens
    - Retorna userId
> Funcion para pesir tracks >>> getTracks()
    - Recibe termino de busqueda, tokens y setTokens
    - Retorna datos de tracks (formateado como ???)
*/