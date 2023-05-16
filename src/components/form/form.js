import styles from "./form.module.css";
import { Link, useLocation } from "react-router-dom";

function Form({ title, children, submitTitle, linkQuestion, link, linkText, onSubmit }) {
    const location = useLocation();
    
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h1 className={styles.title}>{title}</h1>
            {children}

            <button type="submit" className={styles.submit}>{submitTitle}</button>

            <span className={styles.linkQuestion}>
                {linkQuestion}
                <Link to={link} className={styles.link}>
                    {linkText}
                </Link>
            </span>

            {location.pathname === '/login' &&
                <span className={styles.linkQuestion}>
                    Забыли пароль?
                    <Link to='/forgot-password' className={styles.link}>
                        Восстановить пароль
                    </Link>
                </span>
            }

        </form>
    )
}



export default Form;