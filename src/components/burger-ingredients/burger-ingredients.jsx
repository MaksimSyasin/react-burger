import React, { useMemo } from 'react';
import IngredientItem from './ingredient-item/ingredient-item';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INGREDIENT_IN_MODAL } from '../../services/actions/modal';
import { useNavigate } from 'react-router';



function BurgerIngredients() {

  const [current, setCurrent] = React.useState('one')


  const navigate = useNavigate();

  const {ingredients, ingredientsFailed} = useSelector(state => state.ingredients);
  const {ingredientsInConstructor, bun} = useSelector(state => state.ingredients)

  
  const dispatch = useDispatch();


  const handleClickModal = (item) => {
    dispatch({type: ADD_INGREDIENT_IN_MODAL, item: item})
    navigate(`/ingredients/${item._id}`)
  }




  const ingredientsCounter = useMemo(() => {
    const counters = {}

    if (ingredientsInConstructor) {
        ingredientsInConstructor.forEach((ingredient) => {
            if (!counters[ingredient._id]) {
                counters[ingredient._id] = 0;
            }
            counters[ingredient._id]++
        })
    }

    if (bun) counters[bun._id] = 2
    return counters
  }, [ingredientsInConstructor, bun])


  return (
    <>
        <div className={styles.main}>
            <p className="text text_type_main-large">
                Соберите бургер
            </p>
            <div className={`${styles.tabs} mt-5`}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            {
                ingredientsFailed === false 
                ? 
                <div className={`${styles.ingredientWindow} mt-10`}>
                    <p className="text text_type_main-medium ">
                        Булки
                    </p>
                    <div className={`${styles.categoryBlock} mt-6 mb-10 pl-4`}>
                        {
                            ingredients.map((item) => {
                                if (item.type === 'bun') {
                                    return (
                                        <IngredientItem 
                                            item={item} 
                                            key={item._id} 
                                            onIngrediantClick={handleClickModal}
                                            ingredientsCounter = {ingredientsCounter}
                                        />
                                    )
                                }
                            })
                        }
                    </div>

                    <p className="text text_type_main-medium ">
                        Соусы
                    </p>
                    <div className={`${styles.categoryBlock} mt-6 mb-10 pl-4`}>
                        {
                            ingredients.map((item) => {
                                if (item.type === 'sauce') {
                                    return (
                                        <IngredientItem 
                                            item={item} 
                                            key={item._id} 
                                            onIngrediantClick={handleClickModal}
                                            ingredientsCounter = {ingredientsCounter}
                                        />
                                    )
                                }
                            })
                        }
                    </div>

                    <p className="text text_type_main-medium ">
                        Начинки
                    </p>
                    <div className={`${styles.categoryBlock} mt-6 mb-10 pl-4`}>
                        {
                            ingredients.map((item) => {
                                if (item.type === 'main') {
                                    return (
                                        <IngredientItem 
                                            item={item} 
                                            key={item._id} 
                                            onIngrediantClick={handleClickModal}
                                            ingredientsCounter = {ingredientsCounter}
                                        />
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                : <h3 className={'text text_type_main-medium mt-4'}>Произошла ошибка</h3>
            }


        </div>
 
        
    </>
  );
}



export default BurgerIngredients;
