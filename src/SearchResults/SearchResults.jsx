import Tracklist from '../Tracklist/Tracklist'
import styles from '../SearchResults/SearchResults.module.css'

export default function SearchResults(props){
    return(
        <div className={styles.resultsContainer}>
            <h2 className='searchResults'>Search Results</h2>
            <Tracklist userSearchResults={props.userSearchResults} isRemoval={true} onAdd={props.onAdd} />
        </div>
    )
}