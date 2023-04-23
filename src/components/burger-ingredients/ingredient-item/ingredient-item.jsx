import React from 'react';
import styles from './ingredient-item.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../../utils/prop-types'
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd/dist/hooks/useDrag';

function IngredientItem({ item, onIngrediantClick, ingredientsCounter }) {
    const id = item._id

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {id},
      });

  return (
    <div 
        className={styles.ingredientItem} 
        onClick={() => {
            onIngrediantClick(item)
        }} 
        ref={dragRef} 
    >
        {
            ingredientsCounter[item._id] !== undefined &&
            <Counter count={ingredientsCounter[item._id]} size="default"/>
        }

        
        <div className={`mr-4 ml-4`}>
            <img src={item.image} alt={item.name}/>
        </div>
        <div className={`${styles.price} mt-2`}>
            <p className="text text_type_digits-default mr-1">
                {item.price}
            </p>
            <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default mt-2`}>
            {item.name}
        </p>
    </div>
  );
}

IngredientItem.propTypes = {
    item: ingredientPropType.isRequired,
    onIngrediantClick: PropTypes.func.isRequired
};

export default IngredientItem;
