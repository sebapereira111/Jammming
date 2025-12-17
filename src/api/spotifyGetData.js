async function getUserId(tokens, setUser){
    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });

        if(!response.ok){
            throw new Error("Failed to fetch data from the Spotify API");
        }

        const data = await response.json();
        console.log(data)
        setUser(data.id);
    } catch(error){
        console.error("Error fetching data from the Spotify API", error);
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