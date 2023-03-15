import React, { useState } from 'react';
import IngredientItem from './ingredient-item/ingredient-item';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../utils/prop-types'
import PropTypes from 'prop-types';

function BurgerIngredients({ingredients}) {

  const [current, setCurrent] = React.useState('one')
  const [ingredientInModal, setIngredientInModal] = useState()

  const closeIngredientModal = () => {
    setIngredientInModal(null)
  }

  return (
    <>
        <div className={styles.main}>
            <p className="text text_type_main-large">
                Соберите бургер
            </p>
            <div style={{ display: 'flex' }} className='mt-5'>
                <Tab value="one" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <div className={`${styles.ingredientWindow} mt-10`}>
                <p className="text text_type_main-medium ">
                    Булки
                </p>
                <div className={`${styles.categoryBlock} mt-6 mb-10 pl-4`}>
                    {ingredients && 
                        ingredients.map((item, index) => {
                            if (item.type === 'bun') {
                                return (
                                    <IngredientItem item={item} key={index} onIngrediantClick={setIngredientInModal}/>
                                )
                            }
                        })
                    }
                </div>

                <p className="text text_type_main-medium ">
                    Соусы
                </p>
                <div className={`${styles.categoryBlock} mt-6 mb-10 pl-4`}>
                    {ingredients && 
                        ingredients.map((item, index) => {
                            if (item.type === 'sauce') {
                                return (
                                    <IngredientItem item={item} key={index} onIngrediantClick={setIngredientInModal}/>
                                )
                            }
                        })
                    }
                </div>

                <p className="text text_type_main-medium ">
                    Начинки
                </p>
                <div className={`${styles.categoryBlock} mt-6 mb-10 pl-4`}>
                    {ingredients && 
                        ingredients.map((item, index) => {
                            if (item.type === 'main') {
                                return (
                                    <IngredientItem item={item} key={index} onIngrediantClick={setIngredientInModal}/>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
        {ingredientInModal &&
            <Modal onClose={closeIngredientModal} title='Детали ингредиента'>
                <IngredientDetails data={ingredientInModal}/>
            </Modal>
        }
        
    </>
  );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired)
        .isRequired,
};


export default BurgerIngredients;
