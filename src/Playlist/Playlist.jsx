import Tracklist from "../Tracklist/Tracklist";
import styles from '../Playlist/Playlist.module.css';

export default function Playlist(props){
    function handleNameChange({target}) {
        props.onNameChange(target.value);
    }

    const saveButtonClass = props.darkMode ? `${styles.save} ${styles.darkSave}`: styles.save;

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
                darkMode={props.darkMode} 
            />
            <button className={saveButtonClass} onClick={props.onSave}>Save to Spotify</button>
        </div>
    );
}
