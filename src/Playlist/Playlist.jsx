import Tracklist from "../Tracklist/Tracklist";
import styles from '../Playlist/Playlist.module.css'



export default function Playlist(props){
    function handleNameChange({target}) {
        props.onNameChange(target.value)
    }


    return(
        <div className={styles.playlist}>
        <h2 className={styles.title}>Playlist</h2>
        <input defaultValue={"New Playlist"} onChange={handleNameChange} />
        <Tracklist  userSearchResults={props.playlistTracks} onRemoval={props.onRemove} isRemove={true}/>
        <button className={styles.save} onClick={props.onSave} >Save to Spotify</button>
        </div>

    );
}