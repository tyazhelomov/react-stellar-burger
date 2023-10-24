import React from "react";
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useDispatch } from "react-redux";
import { modalInfoSlice } from "../../services/modal-info";
import { modalVisibilitySlice } from "../../services/modal-visibility";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const modalRoot = document.getElementById("modal");

function Modal({ children }) {
  const modalInfoLocalStorage = JSON.parse(localStorage.getItem('modal-info'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { removeModalInfo } = modalInfoSlice.actions;
  const { closeModal } = modalVisibilitySlice.actions;

  const closeModalFunc = React.useCallback(() => {
    dispatch(removeModalInfo());
    dispatch(closeModal());

    if (modalInfoLocalStorage) {
      localStorage.removeItem('modal-info');
      navigate('/')
    }
  }, [closeModal, dispatch, modalInfoLocalStorage, navigate, removeModalInfo]);

  React.useEffect(() => {
    const closeByKey = (e) => {
      if (e.code === 'Escape') {
        closeModalFunc();
      }
    };

    document.addEventListener("keydown", closeByKey);

    return () => {
      document.removeEventListener("keydown", closeByKey);
    }
  }, [closeModalFunc])

  return ReactDOM.createPortal(
    (
      <ModalOverlay onClick={closeModalFunc}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}> 
          <div className={styles.header}>
            <p className="text text_type_main-large">
              { modalInfoLocalStorage?.header }
            </p>
            <CloseIcon type="primary" onClick={closeModalFunc} />
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