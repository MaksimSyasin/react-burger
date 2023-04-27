import React from 'react';
import styles from './app-header.module.css'
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  
  return (
    <header className={styles.header}>
        <nav className={`${styles.nav} main_container`}>
          <div className={styles.flex}>
            <a className={`${styles.iconTextFlex} p-4`} href='/'>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default">
                  Конструктор
              </p>
            </a>
            <a className={`${styles.iconTextFlex} p-4 ml-2`} href='/'>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                  Лента заказов
              </p>
            </a>
            <a className={styles.logo} href='/'>
              <Logo />
            </a>
          </div>
          <a className={`${styles.iconTextFlex} p-4 ml-2`} href='/'>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">
                Личный кабинет
            </p>
          </a>
        </nav>
    </header>
  );
}

export default AppHeader;
