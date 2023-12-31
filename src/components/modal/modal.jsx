import React from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { funcPropType, modalInfoPropType } from "../../utils/prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
const modalRoot = document.getElementById("modal");

function Modal({ children, closeModal, modalInfo }) {
  React.useEffect(() => {
    const closeByKey = (e) => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener("keydown", closeByKey);

    return () => {
      document.removeEventListener("keydown", closeByKey);
    }
  }, [closeModal])

  return ReactDOM.createPortal(
    (
      <ModalOverlay onClick={closeModal}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}> 
          <div className={styles.header}>
            <p className="text text_type_main-large">
              { modalInfo?.header }
            </p>
            <CloseIcon type="primary" onClick={closeModal}/>
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
  modalInfo: modalInfoPropType,
  closeModal: funcPropType,
}; 