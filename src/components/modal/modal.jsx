import React from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { IsVisibleModalContext, ModalInfoContext } from '../../services/appContext';
const modalRoot = document.getElementById("modal");

function Modal({ children }) {

  const { isVisibleModalDispatcher } = React.useContext(IsVisibleModalContext);
  const { modalInfo, modalInfoDispatcher } = React.useContext(ModalInfoContext);

  const closeModal = React.useCallback(() => {
    modalInfoDispatcher({ type: 'remove' });
    isVisibleModalDispatcher({ type: 'close' });
  }, [modalInfoDispatcher, isVisibleModalDispatcher]);

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