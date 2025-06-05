import './App.css';
import { useState, useEffect } from 'react';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import LightMode from '../assets/LightModeDancev2.png';
import DarkMode from '../assets/DarkModeDancev2.svg';
import Spotify from '../util/Spotify';
import WaveText from '../WaveText/WaveText';
import Stars from '../Stars/Stars';

function App() {
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Example Track Name 1', artist: 'Example Track Artist 1', album: 'Example Track Album 1' },
    { id: 2, name: 'Example Track Name 2', artist: 'Example Track Artist 2', album: 'Example Track Album 2' }
  ]);

  const [playlistName, setPlaylistName] = useState("Example Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 1, name: 'Example Track Name 1', artist: 'Example Track Artist 1', album: 'Example Track Album 1' },
    { id: 2, name: 'Example Track Name 2', artist: 'Example Track Artist 2', album: 'Example Track Album 2' }
  ]);

  const [token, setToken] = useState(null);

  const [slideUp, setSlideUp] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const holdDuration = 3000;
  const waveDuration = 2000;

  const wasRedirected = localStorage.getItem("wasRedirected") === "true";
  const savedSearchTerm = localStorage.getItem("pendingSearch");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setDarkMode(true);
      document.body.classList.add('dark');
    }
  }, []);

  // Fetch token once on mount
  useEffect(() => {
    async function fetchToken() {
      const accessToken = await Spotify.getAccessToken();
      if (accessToken) {
        setToken(accessToken);
      }
    }
    fetchToken();
  }, []);

  // If redirected and term exists, run search and update UI immediately
  useEffect(() => {
    if (token && savedSearchTerm) {
      setSearchTerm(savedSearchTerm); // set input value
      search(savedSearchTerm);        // trigger search
      localStorage.removeItem("pendingSearch");
      localStorage.removeItem("wasRedirected");
    }
  }, [token]);

  // Control animation behavior
  useEffect(() => {
    if (wasRedirected) {
      setSlideUp(true);
      setShowSearchBar(true);
      setShowPlaylist(true);
      setShowImages(true);
    } else {
      const timer = setTimeout(() => {
        setSlideUp(true);
        setTimeout(() => setShowSearchBar(true), 500);
        setTimeout(() => setShowPlaylist(true), 1000);
        setTimeout(() => setShowImages(true), 1500);
      }, holdDuration + waveDuration);

      return () => clearTimeout(timer);
    }
  }, []);

  function addTrack(track) {
    if (!playlistTracks.find((t) => t.id === track.id)) {
      setPlaylistTracks(prev => [...prev, track]);
    }
  }

  function removeTrack(track) {
    setPlaylistTracks(prev => prev.filter((t) => t.id !== track.id));
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map(t => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
    setPlaylistName("New Playlist")
    setPlaylistTracks([])
    })
  }

  async function search(term) {
    setSearchTerm(term);
    localStorage.setItem("pendingSearch", term);

    let accessToken = token;
    if (!accessToken) {
      accessToken = await Spotify.getAccessToken();
      if (!accessToken) {
        localStorage.setItem("wasRedirected", "true");
        Spotify.getAuthorisation();
        return;
      }
      setToken(accessToken);
    }

    const results = await Spotify.search(term);
    setSearchResults(results);
  }

  return (
    <div className='webpage'>
      {!wasRedirected && (
        <div className="introOverlay" style={{ top: slideUp ? "-100vh" : "0" }}>
          <Stars />
          <div className="titleBox" style={{ top: slideUp ? 0 : "calc(100% - 65px)" }}>
            <WaveText text="Star" delay={holdDuration} />
            <WaveText text="dust & Sound" delay={holdDuration + 300} className="highlight" />
            <WaveText text="waves" delay={holdDuration + 1000} />
          </div>
        </div>
      )}

      <div className="app">
        <div className={`searchBar ${showSearchBar ? "fade-in-up" : "hidden-up"}`}>
          <SearchBar 
            onSearch={search} 
            term={searchTerm} 
            onTermChange={setSearchTerm}
            darkMode={darkMode} 
          />
        </div>

        <div className={`appPlaylist ${showPlaylist ? "fade-in" : "hidden"}`}>
          <img
            src={DarkMode}
            alt="dance1"
            className={`danceOne ${showImages ? "fade-in-up" : "hidden-up"}`}
          />
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
          <img
            src={LightMode}
            alt="dance2"
            className={`danceTwo ${showImages ? "fade-in-up" : "hidden-up"}`}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
