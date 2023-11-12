import React, { FC } from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
const modalRoot = document.getElementById("modal") as Element;

interface IModal {
  onClose: () => void;
  title?: string;
}

const Modal: FC<IModal> = ({ children, onClose, title = '' }) => {
  React.useEffect(() => {
    const closeByKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByKey);

    return () => {
      document.removeEventListener("keydown", closeByKey);
    }
  }, [onClose])

  return ReactDOM.createPortal(
    (
      <ModalOverlay onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}> 
          <div className={styles.header}>
            <p className="text text_type_main-large">
              { title }
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
