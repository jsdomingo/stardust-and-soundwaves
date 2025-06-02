import Tracklist from "../Tracklist/Tracklist";
import styles from '../Playlist/Playlist.module.css';

export default function Playlist(props){
    function handleNameChange({target}) {
        props.onNameChange(target.value)
    }

    return (
        <div className={styles.playlist}>
            <input 
                className={styles.titleInput} 
                onChange={handleNameChange}
                placeholder="Enter Playlist Name"
            />
            
            <Tracklist  
                userSearchResults={props.playlistTracks} 
                onRemove={props.onRemove} 
                isRemoval={true}
            />
            <button className={styles.save} onClick={props.onSave}>Save to Spotify</button>
        </div>
    );
}
