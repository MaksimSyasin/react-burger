import React from 'react';
import styles from './app-header.module.css'
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, NavLink } from 'react-router-dom';

function AppHeader() {
  
  return (
    <header className={styles.header}>
        <nav className={`${styles.nav} main_container`}>
          <div className={styles.flex}>
            <Link to='/' className={`${styles.iconTextFlex} p-4`} >
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default">
                  Конструктор
              </p>
            </Link>
            <a className={`${styles.iconTextFlex} p-4 ml-2`} href='/'>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                  Лента заказов
              </p>
            </a>
            <Link to='/' className={styles.logo}>
                <Logo />
            </Link>
          </div>
          <NavLink to='/profile' className={`${styles.iconTextFlex} p-4 ml-2`}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">
                Личный кабинет
            </p>
          </NavLink>
        </nav>
    </header>
  );
}

export default AppHeader;
