import { useState } from "react";
import styles from './reset-password.module.css';
import Form from '../../components/form/form';
import { changePassword } from "../../utils/ingredientsApi";
function ResetPassword() {
    const [newPassword, setNewPassword] = useState(null)
    const [token, setToken] = useState(null)
    const [isSuccess, setIsSuccess] = useState(false)
    function handleChangePassword(evt) {
        const target = evt.target;
        const value = target.value;
        setNewPassword(value)
    }

    function handleChangeToken(evt) {
        const target = evt.target;

        const value = target.value;
        setToken(value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        changePassword(newPassword, token)
        .then(res => setIsSuccess(true))
        .catch(err => console.log(err))
    }
    return (
        <Form
            title="Восстановление пароля" submitTitle="Сохранить"
            link="/login" linkQuestion="Вспомнили пароль?" linkText="Войти" onSubmit={handleSubmit}
        >
            <input
                type="password"
                name="password"
                className={styles.input}
                onChange={handleChangePassword}
                placeholder="Введите новый пароль"
            />
            <input
                type="text"
                name="code"
                onChange={handleChangeToken}
                className={styles.input}
                placeholder="Введите код из письма"
            />
            {isSuccess && <span className={styles.success}>Пароль успешно изменен!</span>}
        </Form>
    )
}

export default ResetPassword;