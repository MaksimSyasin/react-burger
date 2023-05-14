import styles from "./profile.module.css";
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateUserAsync, logoutUserAsync } from "../../services/asyncActions/auth";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { logoutAction } from "../../services/actions/auth";

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.authReducer.user);
    const token = useSelector(store => store.authReducer.accessToken);
    const refreshToken = useSelector(store => store.authReducer.refreshToken);
    const [email, setEmail] = useState(user.email || null)
    const [password, setPassword] = useState(user.password || null)
    const [name, setName] = useState(user.name || null)
    const [cookies, setCookie, removeCookie] = useCookies(['stellarBurger']);
    const [isFocus, setIsFocus] = useState(false);
    const [values, setValues] = useState(null);

    function handleChangeEmail(evt) {
        const value = evt.target.value;
        const inputName = evt.target.name;
        setEmail(value)
        setValues({...values, [inputName]: value})
    }

    function handleChangeName(evt) {
        const value = evt.target.value;
        const inputName = evt.target.name;
        setName(value)
        setValues({...values, [inputName]: value})
    }

    function handleChangePassword(evt) {
        const value = evt.target.value;
        const inputName = evt.target.name;
        setPassword(value)
        setValues({...values, [inputName]: value})
    }

    function logout(refreshToken) {
        if (refreshToken !== undefined) {
            dispatch(logoutUserAsync(refreshToken))
            removeCookie('accessToken');
            removeCookie('refreshToken');
        } else {
            dispatch(logoutAction());
            removeCookie('accessToken');
            removeCookie('refreshToken');
            
        }
    }

    function cancelUserData () {
        const inputs = document.querySelectorAll('input')
        inputs.forEach(input => input.value = input.defaultValue);
        setIsFocus(false)
    }

    function saveUserData () {
        dispatch(updateUserAsync(token, values))
        setIsFocus(false)
    }
    
    return (
        <section className={`${styles.profile} main_container`}>
            <nav className={styles.navigation}>
                <NavLink className={({ isActive }) =>
                    isActive ? styles.active : styles.link
                } to='/profile'>Профиль</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive ? styles.active : styles.link
                } to='/profile/orders'>История заказов</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive ? styles.active : styles.link
                } onClick={() => logout(refreshToken)} to='/login'>Выход</NavLink>
            </nav>

            <div>
                <Input
                    name={'name'}
                    icon={'EditIcon'}
                    placeholder={'Имя'}
                    type={'text'}
                    defaultValue={user.name}
                    extraClass={styles.input}
                    onIconClick={() => {
                        if (name !== null) {
                            dispatch(updateUserAsync(token, { "name": name }))
                        }
                    }}
                    onChange={handleChangeName}
                    onFocus={() => setIsFocus(true)}
                />
                <Input
                    name={'email'}
                    icon={'EditIcon'}
                    placeholder={'Логин'}
                    type={'email'}
                    extraClass={styles.input}
                    defaultValue={user.email}
                    onChange={handleChangeEmail}
                    onFocus={() => setIsFocus(true)}
                    onIconClick={() => {
                        if (email !== null) {
                            dispatch(updateUserAsync(token, { "email": email }))
                        }
                    }}
                />
                <Input
                    name={'password'}
                    icon={'EditIcon'}
                    placeholder={'Пароль'}
                    type={'password'}
                    extraClass={styles.input}
                    onChange={handleChangePassword}
                    onFocus={() => setIsFocus(true)}
                    onIconClick={() => {
                        if (password !== null) {
                            dispatch(updateUserAsync(token, { "password": password }))
                        }
                    }}
                />
                <div className={styles.edit__buttons}>
                    <button type="button" className={isFocus ? styles.cancel : styles.hidden}
                    onClick={cancelUserData}>Отмена</button>
                    <button type="button" className={isFocus ? styles.save : styles.hidden}
                    onClick={saveUserData}>Сохранить</button>
                </div>
            </div>
        </section>
    )
}

export default Profile;