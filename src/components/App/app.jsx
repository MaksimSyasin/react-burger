import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

  return (
    <>
      <AppHeader />
      <main className='main_container container_flex'>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </DndProvider>
      </main>
    </>
  );
}

export default App;