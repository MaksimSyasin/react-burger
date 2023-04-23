import React, { useEffect, useState } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../utils/prop-types'
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd/dist/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_INGREDINT_IN_CONSTRUCTOR, ADD_ORDER, RESET_INGREDIENTS_IN_CONSTRUCTOR } from '../../services/actions/burger-constructor';
import CustomConstructorElement from './custom-constructor-element/custom-constructor-element';

function BurgerConstructor({ handleDrop }) {

    const [orderModal, setOrderModal] = useState()
    const [orderInfo, setorderInfo] = useState(null);

    let { ingredientsInConstructor } = useSelector(state => state.ingredients);
    let { bun } = useSelector(state => state.ingredients);

    const dispatch = useDispatch()

    const closeOrderModal = () => {
        setOrderModal(null)
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            handleDrop(itemId);
        }
    });
    

    const [, dropTarget2] = useDrop({
        accept: "ingredient2",
        drop(item, monitor) {
          const dragIndex = monitor.getItem().index;
          const hoverIndex = ingredientsInConstructor.findIndex((el) => el._id === item._id);
          if (dragIndex === hoverIndex) {
            return;
          }
          const newIngredients = [...ingredientsInConstructor];
          const tmp = newIngredients[dragIndex];
          newIngredients[dragIndex] = newIngredients[hoverIndex];
          newIngredients[hoverIndex] = tmp;
          dispatch({
            type: "MOVE_INGREDIENT_IN_CONSTRUCTOR",
            payload: { dragIndex, hoverIndex },
          });
        },
      });
      
      const handleDrag = (index) => {
        const item = { index };
        return item;
      };


    const calcPrice = () => {

        const bunPrice = () => {
            if (Object.keys(bun).length !== 0) {
                return bun.price * 2
            } else {
                return 0
            }
        }

        const ingredientsPrice = () => {
            if (Object.keys(ingredientsInConstructor).length !== 0) {
                return ingredientsInConstructor.reduce((s, v) => s + v.price, 0)
            } else {
                return 0
            }
        }

        return bunPrice() + ingredientsPrice()
    }

    const createOrder = () => {
        const order = {
            bun,
            ingredientsInConstructor,
            price: calcPrice(),
            uniqID: Math.floor(Math.random() * 999999) + 1,
        }

        dispatch({type: ADD_ORDER, order: order})
        dispatch({type: RESET_INGREDIENTS_IN_CONSTRUCTOR})
        setorderInfo(order);
        setOrderModal(true)
    }

    const deleteIngredient = (index) => {
        dispatch({type: REMOVE_INGREDINT_IN_CONSTRUCTOR, index: index})
    }

    return (
        <>

            <div className={styles.main}  ref={dropTarget}>
                <div className={styles.ingredientsListSection}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun ? bun.name : 'Выберите булку'}
                        price={bun.price}
                        thumbnail={bun.image}
                        extraClass='ml-4 mr-4 mb-4'
                    />
                    <ul className={styles.ingredientsListUl}  ref={dropTarget2}>
                        {
                            ingredientsInConstructor &&
                            ingredientsInConstructor.map((item, index) => (
                                <li key={crypto.randomUUID()} >
                                    <DragIcon type="primary" />
                                    <CustomConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                        index={index}
                                        handleDelete={deleteIngredient}
                                        dragHandleProps={handleDrag(index)}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                        extraClass='ml-4 mr-4 mb-4'
                    />
                </div>
                <div className={`${styles.order_btn} mt-10`}>
                    <div className={`${styles.price} mr-10`}>
                        <p className="text text_type_digits-medium">
                            {calcPrice()}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={() => { createOrder() }}
                        disabled={Object.keys(bun).length !== 0 ? false : true}
                    >
                        Нажми на меня
                    </Button>
                </div>
                
            </div>
            {
            orderModal &&
                <Modal onClose={closeOrderModal}>
                    <OrderDetails order={orderInfo}/>
                </Modal>
            }
        </>
    );
}


export default BurgerConstructor;
