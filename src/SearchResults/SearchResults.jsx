import Tracklist from '../Tracklist/Tracklist'
import styles from '../SearchResults/SearchResults.module.css'

export default function SearcResults(){
    return(
        <div className={styles.resultsContainer}>
     <h2 className='searchResults'>SearchResults</h2>
        <Tracklist />
        </div>

    )
}