import React from 'react';
import styles from './ingredient-details.module.css'
import ingredientPropType from '../../utils/prop-types'
import PropTypes from 'prop-types';

function IngredientDetails({data}) {

  return (
    <div className={styles.content}>
        <div className={styles.img}>
            <img src={data.image_large} alt={data.name}/>
        </div>
        <h4 className="text text_type_main-medium mt-4">
            {data.name}
        </h4>
        <div className={`${styles.details} mt-8 mb-4`}>
            <div className={styles.detailsItem}>
                <p className="text text_type_main-default text_color_inactive">
                    Калории, ккал
                </p>
                <p className="text text_type_digits-default text_color_inactive mt-2">
                    {data.calories}
                </p>
            </div>
            <div className={styles.detailsItem}>
                <p className="text text_type_main-default text_color_inactive">
                    Белки, г
                </p>
                <p className="text text_type_digits-default text_color_inactive mt-2">
                    {data.proteins}
                </p>
            </div>
            <div className={styles.detailsItem}>
                <p className="text text_type_main-default text_color_inactive">
                    Жиры, г
                </p>
                <p className="text text_type_digits-default text_color_inactive mt-2">
                    {data.fat}
                </p>
            </div>
            <div className={styles.detailsItem}>
                <p className="text text_type_main-default text_color_inactive">
                    Углеводы, г
                </p>
                <p className="text text_type_digits-default text_color_inactive mt-2">
                    {data.carbohydrates}
                </p>
            </div>
        </div>
    </div>


  );
}

IngredientDetails.propTypes = {
    data: ingredientPropType.isRequired
};

export default IngredientDetails;
