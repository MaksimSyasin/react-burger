import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalSection = document.getElementById('modals')

function Modal({onClose, children, title}) {

    useEffect(() => {

        const handleEsc = (e) => {
            e.key === 'Escape' && onClose()
        }
        
        document.addEventListener('keydown', handleEsc)
        
        return () => {
            document.removeEventListener('keydown', handleEsc)
        }

    }, [onClose])

  return ReactDOM.createPortal(
    <>
        <div className={styles.modalWindow}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3 className="text text_type_main-large">
                        {title}
                    </h3>
                    <div className={styles.closeIcon}>
                        <CloseIcon type="primary" onClick={onClose}/>
                    </div>
                </div>
                <div className={styles.modalContent}>
                    {children}
                </div>

            </div>
        </div>
        <ModalOverlay onClose={onClose}/>
    </>,
    modalSection
  );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element,
    title: PropTypes.string
};

export default Modal;
