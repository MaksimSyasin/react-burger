import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import '@ya.praktikum/react-developer-burger-ui-components';
import './App.css';

const URL_BD = 'https://norma.nomoreparties.space/api/ingredients'

function App() {

  const [ingredients, setIngredients] = useState([])

  useEffect (() => {
    fetch(URL_BD)
    .then(response => response.json())
    .then(data => setIngredients(data.data))
    .catch(() => alert('Произошла ошибка'))
  },[])

  return (
    <>
      <AppHeader />
      <div className='main_container container_flex'>
        <BurgerIngredients ingredients={ingredients}/>
        <BurgerConstructor ingredients={ingredients}/>
      </div>
 
    </>

  );
}

export default App;
