/*
  Spotify Authentication using PKCE (Proof Key for Code Exchange)

  This module handles the complete OAuth 2.0 Authorization Code flow with PKCE
  for securely authenticating users with the Spotify Web API.

  Steps:
  1. Generates a secure PKCE code verifier and challenge.
  2. Redirects the user to Spotify's authorization endpoint for login and consent.
  3. Handles the redirect back to the app and extracts the authorization code.
  4. Exchanges the authorization code for an access token using the stored code verifier.
  5. Stores the access token and metadata in localStorage and returns it for API use.

  Includes token expiration handling and optional reuse of valid stored tokens.
*/

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const scope = 'user-read-private user-read-email';

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Holds the ongoing access token fetch promise to prevent multiple simultaneous token exchanges
let tokenPromise = null;

const Spotify = {
  async getAuthorisation() {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    // Store code verifier for PKCE exchange
    localStorage.setItem('code_verifier', codeVerifier);

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const params = {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  },

  async getAccessToken() {
    // If a token fetch is already in progress, return that promise
    if (tokenPromise) {
      return tokenPromise;
    }

    const storedToken = this.getStoredToken();
    if (storedToken) {
      console.log('[Spotify] Using stored access token');
      return storedToken;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      console.log('[Spotify] No authorization code in URL');
      return null;
    }

    if (localStorage.getItem('code_exchanged')) {
      console.log('[Spotify] Code already exchanged, skipping');
      // Clean URL to remove code param
      window.history.replaceState({}, document.title, window.location.pathname);
      return null;
    }

    const codeVerifier = localStorage.getItem('code_verifier');
    if (!codeVerifier) {
      console.error('[Spotify] Code verifier missing from localStorage');
      return null;
    }

    // Start token exchange, store promise to prevent duplicate calls
    tokenPromise = (async () => {
      try {
        console.log('[Spotify] Exchanging authorization code for access token...');
        const response = await fetch('https://accounts.spotify.com/api/token', {
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
        });

        const data = await response.json();

        if (data.access_token) {
          console.log('[Spotify] Access token received:', data.access_token);

          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('expires_in', data.expires_in);
          localStorage.setItem('token_timestamp', Date.now());
          localStorage.setItem('code_exchanged', 'true');

          // Clean URL and remove code verifier after exchange
          window.history.replaceState({}, document.title, window.location.pathname);
          localStorage.removeItem('code_verifier');

          return data.access_token;
        } else {
          console.error('[Spotify] Failed to get access token:', data);
          return null;
        }
      } catch (error) {
        console.error('[Spotify] Token exchange error:', error);
        return null;
      } finally {
        // Reset tokenPromise so next call can retry if needed
        tokenPromise = null;
      }
    })();

    return tokenPromise;
  },

  getStoredToken() {
    const token = localStorage.getItem('access_token');
    const timestamp = localStorage.getItem('token_timestamp');
    const expiresIn = localStorage.getItem('expires_in');

    if (!token || !timestamp || !expiresIn) return null;

    const elapsed = (Date.now() - Number(timestamp)) / 1000;
    if (elapsed > Number(expiresIn)) {
      console.log('Access token expired');
      return null;
    }

    return token;
  },

  async search(term) {
    const accessToken = await this.getAccessToken();
    if (!accessToken) {
      console.error("No access token available");
      return [];
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) {
        console.error('Spotify search failed:', response.status, response.statusText);
        return [];
      }
      const jsonResponse = await response.json();

      if (!jsonResponse.tracks) {
        console.log("No tracks found");
        return [];
      }
      return jsonResponse.tracks.items.map((t) => ({
        id: t.id,
        name: t.name,
        artist: t.artists[0].name,
        album: t.album.name,
        uri: t.uri
      }));
    } catch (err) {
      console.error('Search request failed:', err);
      return [];
    }
  },
};

export default Spotify;
