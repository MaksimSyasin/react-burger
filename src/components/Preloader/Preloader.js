import React from "react";
import styles from "./Preloader.module.scss"
function Preloader() {
    return (
        <div className={styles.preloader}>
            <span className="text text_type_digits-large">Loading...</span>
        </div>
    )
}

export default Preloader;