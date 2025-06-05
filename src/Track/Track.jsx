import styles from '../Track/Track.module.css';

export default function Track(props) {
  const trackDescriptionClass = props.darkMode
  ? `${styles.trackDescription} ${styles.darkTrackDescription}`
  : styles.trackDescription;

  function renderAction() {
    if (props.isRemoval) {
      return (
        <button className={styles.trackAction} onClick={() => props.onRemove(props.track)}> - </button>);
    } else {
      return (
        <button className={styles.trackAction} onClick={() => props.onAdd(props.track)}> + </button>);
    }
  }

  return (
    <div className={styles.track}>
      <div className={styles.trackInfoWrapper}>
        <div className={styles.trackInformation}>
          <h4 className={styles.trackTitle}>{props.track.name}</h4>
          <p className={trackDescriptionClass}>
            {props.track.artist} | {props.track.album}
          </p>
        </div>
      </div>
      <div className={styles.trackActionWrapper}>{renderAction()}</div>
    </div>
  );
}
