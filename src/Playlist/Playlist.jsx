import Tracklist from "../Tracklist/Tracklist";
import styles from '../Playlist/Playlist.module.css'



export default function Playlist(){
    return(
        <div className={styles.playlist}>
        <h2 className={styles.title}>Playlist</h2>
        <input defaultValue={"New Playlist"} />
        <Tracklist />
        <button className={styles.save}>Save to Spotify</button>
        </div>

    );
}