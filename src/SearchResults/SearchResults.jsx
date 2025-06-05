import Tracklist from '../Tracklist/Tracklist';
import styles from '../SearchResults/SearchResults.module.css';

export default function SearchResults(props){
    return(
        <div className={styles.resultsContainer}>
            <h2 className={styles.searchResultsTitle}>Search Results</h2>
            <Tracklist
                userSearchResults={props.userSearchResults} 
                isRemoval={false} 
                onAdd={props.onAdd} 
                darkMode={props.darkMode}
            />
        </div>
    );
}
