import React from "react";
import styles from "./Pagination.module.css"

export default function Pagination({gamesXpage, allGames, pagination }) {
    const pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(allGames/gamesXpage); i++) {
      pageNumbers.push(i)
    }
    //console.log(pageNumbers);
    return (
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li key={number} className={styles.li}>
                <button
                  className={styles.button}
                  onClick={() => pagination(number)}
                >
                  {number}
                </button>
              </li>
            ))}
        </ul>
      </nav>
    );
}