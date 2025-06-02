import './App.css'
import { useState, useEffect } from 'react';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import LightMode from '../assets/LightModeDancev2.png';
import DarkMode from '../assets/DarkModeDancev2.svg';
import Spotify from '../util/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState(
[    {
      id: 1,
      name: 'Example track name 1',
      artist: 'example track artist 1',
      album: 'example track album 1'
    },
    {
      id: 2,
      name: 'Example track name 2',
      artist: 'example track artist 2',
      album: 'example track album 2'
    }]
  );

  const [playlistName, setPlaylistName] =  useState("example Playlist")
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      id: 1,
      name: "example playlist 1",
      artist: 'example playlist artist 1',
      album: 'example playlist album 1'

    },
    {
      id: 2,
      name: "example playlist 2",
      artist: 'example playlist artist 2',
      album: 'example playlist album 2'

    }
  ])
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
  function passTrackToRemove(){
    props.onRemove(props.track);
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
    <>
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
        </div>
      </div>
    </>
  );
}

export default App
