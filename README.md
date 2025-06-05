
# 🌌 Stardust & Soundwaves – Spotify Playlist Creator

This is a web application that lets you search for songs and build personalised Spotify playlists in the browser — no backend required. It uses the Spotify Web API with secure PKCE authentication to let users log in, search for tracks, and save custom playlists to their account.


## ✨ Features

- 🔐 **Secure Spotify login** using OAuth 2.0 + PKCE (frontend-only)
- 🔎 **Search** for tracks by name or artist
- ➕ **Add/remove tracks** to a custom playlist
- 💾 **Save to Spotify** with a custom name


## 🛠 Built With

- [React](https://reactjs.org/) – For building interactive UIs
- [Vite](https://vitejs.dev/) – Blazing-fast frontend tooling
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) – Music data & playlist creation
- CSS Modules – Scoped, component-friendly styling
- PKCE Flow – Secure, backend-free Spotify auth
- `localStorage` – Session persistence


## 🧰 Getting Started

### 1. Clone this repository
```
git clone https://github.com/your-username/stardust-spotify.git
cd stardust-spotify
````

### 2. Set up your Spotify Developer credentials
Obtain your client_id by setting up an app in the [Spotify Web API](https://developer.spotify.com/documentation/web-api/tutorials/getting-started). Add your details to the `.env` file in the root directory:

<!-- ```

``` -->

```
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_REDIRECT_URI=https://ip-address:5173
````

Note: you will not be able to use localhost as the redirect URI as they do not allow for unsafe connections. Make sure your **Spotify Developer App** has the same redirect URI set in the dashboard.


### 3. Install dependencies and run the app
<!-- ```

``` -->

```
npm install
npm run dev -- --host
```

## 📦 Deployment

You can deploy to any static hosting provider (like [Netlify](https://netlify.com), [Vercel](https://vercel.com), or [GitHub Pages](https://pages.github.com)).



## 📸 Screenshots / Demo 

> *TODO: Add a short GIF or screenshots of the UI*


## 🔮 Future Enhancements
* 🎭 12 music mood discovery for users to select vibes, with music based on audio features like valence and energy for better mood matching
* 🔍 Extend searches to include playlists, not just individual tracks
* 🔔 Add notifications for successful or unsuccessful playlist creation
* 🎵 Add 30-second audio previews

> ✨ “Powered by Stardust, Soundwaves, and Spotify.”


