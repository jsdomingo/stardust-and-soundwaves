import styles from './SearchBar.module.css'
import { useState } from 'react'

export default function SearchBar(props){
    const [term, setTerm] = useState("");
    
    function passTerm() {
        props.onSearch(term)
    }

    function handleTermChange({target}){
        setTerm(target.value);
    }

    return(
        <div className={styles.searchBar}>
            <input 
            className={styles.searchInput} 
            placeholder='Enter Your Vibe' 
            onChange={handleTermChange}
            />
            <button 
            className={styles.searchBtn}
            onClick={passTerm}
            >
                Search
            </button>
        </div>
    )
}