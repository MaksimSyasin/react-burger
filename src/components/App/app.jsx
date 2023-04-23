import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ADD_INGREDIENT_IN_CONSTRUCTOR } from '../../services/actions/burger-constructor';

function App() {

  const dispatch = useDispatch();

  const handleDrop = (itemId) => {
      dispatch({type: ADD_INGREDIENT_IN_CONSTRUCTOR, ingredientID: itemId.id});
  };



  return (
    <>
      <AppHeader />
      <main className='main_container container_flex'>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients

          />
          <BurgerConstructor handleDrop={handleDrop}/>
        </DndProvider>
      </main>
    </>
  );
}

export default App;