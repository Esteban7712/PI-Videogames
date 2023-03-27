import React from 'react'
import styles from "./Error.module.css"

function Error() {
  return (
    <div>
        <h1 className={styles.titulo}>Error 404</h1>  
        <h2 className={styles.subTitulo}>Page not Found</h2>  
    </div>
    
  )
}

export default Error