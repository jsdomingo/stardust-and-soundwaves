import styles from './SearchBar.module.css';

export default function SearchBar({ term, onTermChange, onSearch, darkMode }) {
  const searchInputClass = darkMode ? `${styles.searchInput} ${styles.darkSearchInput}`: styles.searchInput;
  function handleChange(event) {
    onTermChange(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents page reload
    onSearch(term);
  }

  return (
    <div className={styles.searchBar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
            className={searchInputClass}
            placeholder="Enter Your Vibe"
            onChange={handleChange}
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
