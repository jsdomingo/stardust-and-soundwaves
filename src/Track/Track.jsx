import styles from '../Track/Track.module.css';

export default function Track(props){
    return(
        <div className={styles.track}>
            <div className="trackInformation">
                <h4 className="trackTitle">{props.track.name}</h4>
                <p className="trackDescription">{props.track.artist} | {props.track.album}</p>
            </div>
            <button className="trackAction">+</button>
        </div>
    )
}

