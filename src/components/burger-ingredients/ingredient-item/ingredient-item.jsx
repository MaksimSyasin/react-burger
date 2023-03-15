import React from 'react';
import styles from './ingredient-item.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../../utils/prop-types'
import PropTypes from 'prop-types';

function IngredientItem({item, onIngrediantClick}) {

  return (
    <div className={styles.ingredientItem} onClick={() => {
        onIngrediantClick(item)
    }}>
        <Counter count={1} size="default"/>
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
