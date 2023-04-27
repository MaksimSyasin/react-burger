import React, { useState, useCallback } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd/dist/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_INGREDINT_IN_CONSTRUCTOR, RESET_INGREDIENTS_IN_CONSTRUCTOR, MOVE_INGREDIENT_IN_CONSTRUCTOR, ADD_INGREDIENT_IN_CONSTRUCTOR } from '../../services/actions/ingredients';
import { ADD_ORDER, RESET_ORDER, SET_ORDER } from '../../services/actions/order';
import CustomConstructorElement from './custom-constructor-element/custom-constructor-element';


function BurgerConstructor() {

    const [orderModal, setOrderModal] = useState()
    const [orderInfo, setorderInfo] = useState(null);


    const ingredientsInConstructor = useSelector(state => state.ingredients.ingredientsInConstructor);
    const bun = useSelector(state => state.ingredients.bun);

    const dispatch = useDispatch()

    const closeOrderModal = () => {
        setOrderModal(null)
        dispatch({type: RESET_ORDER})
    }

    const handleDrop = (itemId) => {
        dispatch({type: ADD_INGREDIENT_IN_CONSTRUCTOR, ingredientID: itemId.id});
    };

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            handleDrop(itemId);
        }
    });

    const renderCard = useCallback((item, index) => {
        return (
            <CustomConstructorElement
                key={item._id}
                id={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                index={index}
                handleDelete={deleteIngredient}
                item = {item}
                moveCard={moveCard}
            />
        )
    }, [])

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch({type: MOVE_INGREDIENT_IN_CONSTRUCTOR, payload: { dragIndex, hoverIndex}})
    }, [])

    const calcPrice = () => {

        const bunPrice = () => {
            if (bun) {
                return bun.price * 2
            } else {
                return 0
            }
        }

        const ingredientsPrice = () => {
            if (ingredientsInConstructor) {
                return ingredientsInConstructor.reduce((s, v) => s + v.price, 0)
            } else {
                return 0
            }
        }

        return bunPrice() + ingredientsPrice()
    }

    const createOrder = () => {
        const ingredientsIds = [
            bun._id, 
            ...ingredientsInConstructor.map((ingredient) => ingredient._id), 
            bun._id, 
        ];

        const order = {
          bun,
          ingredientsInConstructor,
          price: calcPrice(),
          uniqID: Math.floor(Math.random() * 999999) + 1,
        };
      
        fetch('https://norma.nomoreparties.space/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ingredients: ingredientsIds}),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to submit order');
            }
            return response.json();
          })
          .then((data) => {
            order.uniqID = data.order.number; 
            dispatch({ type: SET_ORDER, order: order });
            dispatch({ type: RESET_INGREDIENTS_IN_CONSTRUCTOR });
            setorderInfo(order);
            setOrderModal(true);
          })
          .catch((err) => {
            console.error(err);
            alert('Ошибка при создании заказа, пожалуйста попробуйте позже');
          });
      };

    const deleteIngredient = (index) => {
        dispatch({type: REMOVE_INGREDINT_IN_CONSTRUCTOR, index: index})
    }

    return (
        <>
         <div className={styles.main}  ref={dropTarget}>
            <div className={styles.ingredientsListSection}>
                {
                    bun ? 
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun ? bun.name + ` (Верх)` : 'Выберите булку'}
                        price={bun.price}
                        thumbnail={bun.image}
                        extraClass='ml-4 mr-4 mb-4'
                    />
                    :
                    <CustomConstructorElement
                        text={'Перетащите булки'}
                        
                    />
                }
                <ul className={styles.ingredientsListUl} >
                    {
                        ingredientsInConstructor.map((item, index) => (
                            <li key={crypto.randomUUID()} >
                                <DragIcon type="primary" />
                                {renderCard(item, index)}
                            </li>
                        ))
                    }
                </ul>
                {
                    bun &&
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun ? bun.name + ` (Низ)` : 'Выберите булку'}
                        price={bun.price}
                        thumbnail={bun.image}
                        extraClass='ml-4 mr-4 mb-4'
                    />
                }

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
                        onClick={createOrder}
                        disabled={bun ? false : true}
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
