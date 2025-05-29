import styles from './SearchBar.module.css'

export default function SearchBar(){
    return(
        <div className={styles.searchBar}>
            <input className={styles.searchInput} placeholder='Enter Your Vibe' />
            <button className={styles.searchBtn}>Search</button>
        </div>
    )
}