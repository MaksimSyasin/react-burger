import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';

const URL_BD = 'https://norma.nomoreparties.space/api/ingredients'

function App() {

  const [ingredients, setIngredients] = useState([])

  useEffect (() => {
    fetch(URL_BD)
        .then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(data => setIngredients(data.data))
      .catch(error => alert(error.message))
  },[])

  return (
    <>
      <AppHeader />
      <main className='main_container container_flex'>
        <BurgerIngredients ingredients={ingredients}/>
        <BurgerConstructor ingredients={ingredients}/>
      </main>
 
    </>

  );
}

export default App;
