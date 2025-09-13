import styles from './Searchbar.module.css'
import { Link } from 'react-router-dom';

import { FaSearch } from "react-icons/fa";

export default function Searchbar({width}) {
  return (
    <div className={styles.searchbarContainer}>
        <input type="text" className={styles.searchInput}/>
        <FaSearch className={styles.searchBtn}/>
    </div>
  );
}