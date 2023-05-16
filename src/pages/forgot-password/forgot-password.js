import styles from './forgot-password.module.css';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';
import Form from '../../components/form/form';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { resetPassword } from '../../utils/ingredientsApi';
import { useValidation } from '../../utils/Validate';

function ForgotPassword({isVisited}) {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['stellarBurger']);
    const [email, setEmail] = useState(null)
    const { values, errors, isValid } = useValidation();

    function handleChange(evt) {
        const target = evt.target;
        const name = target.name;
        const value = target.value;
        setEmail(value)
        isVisited(true)
        
    }

    function handleReset(e) {
        e.preventDefault()
        setCookie("isUserVisited", true, {maxAge: 500})
        resetPassword(values.email)
        .then(res => navigate('/reset-password'))
        .catch(err => console.log(err))
    }
    return (
        <Form
            title="Восстановление пароля" submitTitle="Восстановить"
            link="/login" linkQuestion="Вспомнили пароль?" linkText="Войти" onSubmit={handleReset}
        >
            <input
                type="email"
                name="email"
                className={styles.input}
                placeholder="Укажите e-mail"
                minLength={2}
                maxLength={50}
                onChange={handleChange}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
            />
            <span
                className={
                    errors["email"] === ""
                    ? styles.error
                    : styles.error_active
                }
            >
                {errors["email"]}
            </span>
        </Form>
    )
}



export default ForgotPassword;