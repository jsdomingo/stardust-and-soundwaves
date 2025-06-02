import './App.css'
import { useState, useEffect } from 'react';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import LightMode from '../assets/LightModeDancev2.png';
import DarkMode from '../assets/DarkModeDancev2.svg';
import Spotify from '../util/Spotify';
import WaveText from '../WaveText/WaveText'; // import your WaveText component

function App() {
  // Existing state
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

  // New state controlling titleBox sliding
  const [slideUp, setSlideUp] = useState(false);

  // Timing constants
  const holdDuration = 3000;  // 3 seconds hold at bottom
  const waveDuration = 2000;  // 2 seconds wave animation duration

  // On mount, Spotify auth
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

  // After hold + wave duration, trigger slide up
  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideUp(true);
    }, holdDuration + waveDuration);

    return () => clearTimeout(timer);
  }, []);

  // Existing functions
  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log("Track is there")
    } else {
      setPlaylistTracks(newTrack);
    }
  }

  function removeTrack(track) {
    const exisitingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(exisitingTrack);
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
      {/* Updated titleBox with inline style for sliding */}
      <div
  className="titleBox"
  style={{
    top: slideUp ? 0 : "calc(100% - 65px)",
    transition: "top 2s ease",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <WaveText text="Star" delay={holdDuration} />
  <WaveText text="dust & Sound" delay={holdDuration + 300} className="highlight" />
  <WaveText text="waves" delay={holdDuration + 1000} />
</div>


      <div className="app">
        <div className='searchBar'>
          <SearchBar onSearch={search} />
        </div>
        <div className="appPlaylist">
          <img src={DarkMode} alt="dance1" className='danceOne' />
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} />
          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks} 
            onRemove={removeTrack} 
            onNameChange={updatePlaylistName} 
            onSave={savePlaylist}
          />
          <img src={LightMode} alt="dance2" className='danceTwo'/>
        </div>
      </div>
    </div>
  );
}

export default App;
