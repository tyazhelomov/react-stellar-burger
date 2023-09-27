import React from "react";
import styles from './modal-element.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { funcPropType, modalInfoPropType } from "../../utils/prop-types";

function ModalElement({ closeModal, modalInfo }) {
  const closeByKey = React.useCallback((e) => {
    if (e.code === 'Escape') {
      closeModal();
    }
  }, [closeModal])

  React.useEffect(()=>{
    document.addEventListener("keydown", closeByKey);

    return () => {
      document.removeEventListener("keydown", closeByKey);
    }
  }, [closeByKey])

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}> 
        <div className={styles.header}>
          <p className="text text_type_main-large">
            { modalInfo?.header }
          </p>
          <CloseIcon type="primary" onClick={closeModal}/>
        </div>
        { modalInfo?.ingredient && <IngredientDetails modalInfo={ modalInfo } /> }
        { modalInfo?.order && <OrderDetails modalInfo={ modalInfo } />}
      </div>
    </div>
  )
}

export default ModalElement;

ModalElement.propTypes = {
  modalInfo: modalInfoPropType,
  closeModal: funcPropType,
}; 