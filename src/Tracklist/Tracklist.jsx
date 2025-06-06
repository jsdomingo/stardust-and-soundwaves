import Track from '../Track/Track';
import styles from '../Tracklist/Tracklist.module.css';

export default function Tracklist(props){
    return(
      <div className={styles.tracklist}>
        {props.userSearchResults && props.userSearchResults.length > 0 ? (
          props.userSearchResults.map((track) => (
            <Track 
              track={track} 
              key={track.id} 
              isRemoval={props.isRemoval} 
              onAdd={props.onAdd} 
              onRemove={props.onRemove} 
              darkMode={props.darkMode}
            />
          ))
        ) : (
          <p>No tracks available</p>
        )}
      </div>
    );
}
