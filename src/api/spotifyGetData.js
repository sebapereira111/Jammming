const getUserId = async (tokens, setUser) => {
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
};

export const spotifyGetData = { getUserId };
