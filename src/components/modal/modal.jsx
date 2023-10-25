import React from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const modalRoot = document.getElementById("modal");

function Modal({ children, onClose }) {
  const { id } = useParams();
  const { modalInfo } = useSelector(store => ({
    modalInfo: store.modalInfo,
  }), shallowEqual);

  React.useEffect(() => {
    const closeByKey = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByKey);

    return () => {
      document.removeEventListener("keydown", closeByKey);
    }
  }, [onClose])

  const header = id ? 'Детали ингредиента' : modalInfo?.header;

  return ReactDOM.createPortal(
    (
      <ModalOverlay onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}> 
          <div className={styles.header}>
            <p className="text text_type_main-large">
              { header }
            </p>
            <CloseIcon type="primary" onClick={() => onClose()} />
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