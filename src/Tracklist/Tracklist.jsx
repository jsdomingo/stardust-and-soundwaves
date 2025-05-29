import Track from '../Track/Track'
import styles from '../Tracklist/Tracklist.module.css'

export default function Tracklist(){
    return(
        <div className={styles.tracklist}>
        <h3>Tracklist</h3>
        <Track/>
        <Track/>
        <Track/>
        </div>
    )
}