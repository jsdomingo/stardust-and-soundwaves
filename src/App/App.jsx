import './App.css'
import Playlist from '../Playlist/Playlist';
import SearcResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import LightMode from '../assets/LightModeDancev2.png';
import DarkMode from '../assets/DarkModeDancev2.svg';

function App() {

  return (
    <>
      <div className="titleBox">
      <h1 className="title">Ja<span className="highlight">MMM</span>ing</h1>
      </div>

      <div className="app">
        <div  className='searchBar'>
        <SearchBar />
        </div>
        <div className="appPlaylist">
        <img src={DarkMode} alt="dance1" className='danceOne' />
      <SearcResults />
      <Playlist />
      <img src={LightMode} alt="dance2" className='danceTwo'/>
      </div>
      </div>


    </>
  )
}

export default App
