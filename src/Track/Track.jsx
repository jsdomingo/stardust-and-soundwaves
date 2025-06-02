import styles from '../Track/Track.module.css';

export default function Track(props){
    function renderAction() {
        if(props.isRemoval) {
            //Remove button
            return <button className={styles.trackAction} onClick={() => props.onRemove(props.track)}>-</button>
        } else {
            return <button className={styles.trackAction} onClick={() => props.onAdd(props.track)}>+</button>
        }
    }

    return (
        <div className={styles.track}>
          <div className={styles.trackInfoWrapper}>
            <div className={styles.trackInformation}>
              <h4 className={styles.trackTitle}>{props.track.name}</h4>
              <p className={styles.trackDescription}>{props.track.artist} | {props.track.album}</p>
            </div>
          </div>
          <div className={styles.trackActionWrapper}>
            {renderAction()}
          </div>
        </div>
      );

    }