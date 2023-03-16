import React, { useEffect, useState } from 'react';
import done from '../../images/done.png'
import styles from './order-details.module.css'


function OrderDetails() {

  return (
    <div className={styles.order}>
        <h4 className={`${styles.orderId} text text_type_digits-large mt-7`}>
            034536
        </h4>
        <p className="text text_type_main-medium mt-8">
            идентификатор заказа
        </p>
        <div className={`${styles.doneImg} mt-15`}>
            <img src={done}  alt='done'/>
        </div>
        <p className="text text_type_main-medium mt-15">
            Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-medium text_color_inactive mt-2 pb-20">
            Дождитесь готовности на орбитальной станции
        </p>
    </div>
  );
}

export default OrderDetails;
