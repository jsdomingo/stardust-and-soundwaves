import './App.css'
import { useState } from 'react';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import LightMode from '../assets/LightModeDancev2.png';
import DarkMode from '../assets/DarkModeDancev2.svg';

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
  
  return (
    <>
      <div className="titleBox">
      <h1 className="title">Star<span className="highlight">dust & Sound</span>waves</h1>
      </div>

      <div className="app">
        <div  className='searchBar'>
        <SearchBar />
        </div>
        <div className="appPlaylist">
        <img src={DarkMode} alt="dance1" className='danceOne' />
      <SearchResults userSearchResults={searchResults} />
      <Playlist playlistName={playlistName} playlistTracks={playlistTracks} />
      <img src={LightMode} alt="dance2" className='danceTwo'/>
      </div>
      </div>


    </>
  )
}

export default App
