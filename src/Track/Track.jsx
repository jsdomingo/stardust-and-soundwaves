import styles from '../Track/Track.module.css';

export default function Track(props){
    function passTrack(){
        props.onAdd(props.track);
    }

    function renderAction() {
        if(props.isRemoval) {
            return <button className={styles.trackAction} onClick={passTrack}>+</button>
        } else {
            return <button className={styles.trackAction}>-</button>
        }
    }




    return(
        <div className={styles.track}>
            <div className="trackInformation">
                <h4 className="trackTitle">{props.track.name}</h4>
                <p className="trackDescription">{props.track.artist} | {props.track.album}</p>
            </div>
            {renderAction()}
        </div>
    )
}