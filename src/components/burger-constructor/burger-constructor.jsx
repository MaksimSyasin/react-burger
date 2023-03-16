import React, { useState } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../utils/prop-types'
import PropTypes from 'prop-types';


function BurgerConstructor({ingredients}) {

  const [orderModal, setOrderModal] = useState()

  const closeOrderModal = () => {
    setOrderModal(null)
  }

  return (
    <>
        <div className={styles.main}>
            <div className={styles.ingredientsListSection}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    extraClass='ml-4 mr-4 mb-4'
                />
                <ul className={styles.ingredientsListUl}>
                    {ingredients &&
                        ingredients.map((item) => {
                            if (item.type === 'main' || item.type === 'sauce') {
                                return (
                                    <li key={item._id}>
                                        <DragIcon type="primary" />
                                        <ConstructorElement
                                            text={item.name}
                                            price={item.price}
                                            thumbnail={item.image}
                                        />
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    extraClass='ml-4 mr-4 mt-4'
                />
            </div>
            <div className={`${styles.order_btn} mt-10`}>
                <div className={`${styles.price} mr-10`}>
                    <p className="text text_type_digits-medium">
                        610
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={() => {setOrderModal(true)}}>
                    Нажми на меня
                </Button>
            </div>
        </div>
        {orderModal &&
            <Modal onClose={closeOrderModal}>
                <OrderDetails/>
            </Modal>
        }
    </>
  );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired)
        .isRequired,
};

export default BurgerConstructor;
