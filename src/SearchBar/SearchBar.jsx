import styles from './SearchBar.module.css';
import { useState } from 'react';

export default function SearchBar(props) {
  const [term, setTerm] = useState("");

  function handleTermChange({ target }) {
    setTerm(target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents page reload
    props.onSearch(term);
  }

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          placeholder="Enter Your Vibe"
          onChange={handleTermChange}
          value={term}
        />
        <button
          className={styles.searchBtn}
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}
