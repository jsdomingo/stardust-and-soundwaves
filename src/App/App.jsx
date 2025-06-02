import './App.css'
import { useState, useEffect } from 'react';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import LightMode from '../assets/LightModeDancev2.png';
import DarkMode from '../assets/DarkModeDancev2.svg';
import Spotify from '../util/Spotify';

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

    // On mount, try to get access token or redirect for auth
    useEffect(() => {
      async function authenticate() {
        const accessToken = await Spotify.getAccessToken();
        if (!accessToken) {
          // No token, start authorization flow
          Spotify.getAuthorisation();
        } else {
          setToken(accessToken);
        }
      }
      authenticate();
    }, []);


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
      <div className="titleBox">
        <h1 className="title">Star<span className="highlight">dust & Sound</span>waves</h1>
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
      <div className='webpage'>
      <div className={`titleBox ${titleSlidePhase}`}>
  <WaveText text="Star" delay={0} play={titleSlidePhase !== 'offscreen'} />
  <WaveText text="dust & Sound" className="highlight" delay={300} play={titleSlidePhase !== 'offscreen'} />
  <WaveText text="waves" delay={1000} play={titleSlidePhase !== 'offscreen'} />
</div>
        </div>
      </div>
    </div>
  );
}

export default App
