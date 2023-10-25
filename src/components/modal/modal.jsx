import React from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
const modalRoot = document.getElementById("modal");

function Modal({ children, onClose }) {
  const modalInfoLocalStorage = JSON.parse(localStorage.getItem('modal-info'));

  React.useEffect(() => {
    const closeByKey = (e) => {
      if (e.code === 'Escape') {
        onClose(modalInfoLocalStorage);
      }
    };

    document.addEventListener("keydown", closeByKey);

    return () => {
      document.removeEventListener("keydown", closeByKey);
    }
  }, [modalInfoLocalStorage, onClose])

  return ReactDOM.createPortal(
    (
      <ModalOverlay onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}> 
          <div className={styles.header}>
            <p className="text text_type_main-large">
              { modalInfoLocalStorage?.header }
            </p>
            <CloseIcon type="primary" onClick={() => onClose(modalInfoLocalStorage)} />
          </div>
          { children }
        </div>
      </ModalOverlay>
    ),
    modalRoot,
  )
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.object,
}; 