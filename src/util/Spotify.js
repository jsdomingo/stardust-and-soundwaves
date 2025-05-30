let accessToken;
const clientID = 'INSERT_YOUR_CLIENT_ID';
const redirectURI="INSERT_YOUR_URI";

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;
        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if( tokenInURL && expiryTime) {
            //Set access token and expiry time
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);

            //reset function when token expires
            window.setTimeout(() => (accessToken = ""), expiresIn*1000);

            //clear URL after token expires
            window.history.pushState("Access token", null, "/");
            return accessToken
        }

        const redirect =  `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = redirect;
    },
    search(term) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: "GET",
            headers: {Authorization: `bearer ${accessToken}`},
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            if (!jsonResponse){
                console.log("Response Error")
            }
            return jsonResponse.tracks.items.map((t) => ({
                id: t.id,
                name: t.name,
                artist: t.artists[0].name,
                album: t.album.name,
                uri: t.uri
            }));
        });
    }
}

export {Spotify}