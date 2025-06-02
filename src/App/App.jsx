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
    { id: 1, name: "Example Playlist 1", artist: 'Example Playlist Artist 1', album: 'Example Playlist Album 1' },
    { id: 2, name: "Example Playlist 2", artist: 'Example Playlist Artist 2', album: 'Example Playlist Album 2' }
  ]);

  const [token, setToken] = useState(null);
  const [slideUp, setSlideUp] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showImages, setShowImages] = useState(false);

  const holdDuration = 3000;
  const waveDuration = 2000;

  useEffect(() => {
    async function authenticate() {
      const accessToken = await Spotify.getAccessToken();
      if (!accessToken) {
        Spotify.getAuthorisation();
      } else {
        setToken(accessToken);
      }
    }
    authenticate();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideUp(true);

      setTimeout(() => setShowSearchBar(true), 500);
      setTimeout(() => setShowPlaylist(true), 1000);
      setTimeout(() => setShowImages(true), 1500);
    }, holdDuration + waveDuration);

    return () => clearTimeout(timer);
  }, []);

  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    if (!existingTrack) {
      setPlaylistTracks(prev => [...prev, track]);
    }
  }

  function removeTrack(track) {
    setPlaylistTracks(prev => prev.filter((t) => t.id !== track.id));
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist(){
    const trackURIs = playlistTracks.map((t) => t.uri);
  }

  function search(term){
    if (!token) {
      console.error('No access token available for search');
      return;
    }
    Spotify.search(term).then(results => setSearchResults(results));
  }

  return (
    <div className='webpage'>
      <div
        className="introOverlay"
        style={{ top: slideUp ? "-100vh" : "0" }}
      >
        <Stars />
        <div
          className="titleBox"
          style={{ top: slideUp ? 0 : "calc(100% - 65px)" }}
        >
          <WaveText text="Star" delay={holdDuration} />
          <WaveText text="dust & Sound" delay={holdDuration + 300} className="highlight" />
          <WaveText text="waves" delay={holdDuration + 1000} />
        </div>
      </div>

      <div className="app">
        <div className={`searchBar ${showSearchBar ? "fade-in" : "hidden"}`}>
          <SearchBar onSearch={search} />
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
