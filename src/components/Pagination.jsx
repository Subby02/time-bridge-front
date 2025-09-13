import styles from './Pagination.module.css'
import { Link } from 'react-router-dom';

import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";

export default function Pagination({startPage, endPage}) {
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.paginationContainer}>
        <button className={styles.btnWhite}><MdNavigateBefore className={styles.icon}/></button>

        {pageNumbers.map(page => (
            <button className={styles.btn}>
            {page}
            </button>
        ))}

        <button className={styles.btnWhite}><MdNavigateNext className={styles.icon}/></button>
        </div>
    );
}