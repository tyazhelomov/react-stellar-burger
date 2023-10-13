import React from 'react';
import styles from './ingredient-details.module.css';
import { shallowEqual, useSelector } from 'react-redux';

function IngredientDetails() {
  const { modalInfo } = useSelector(store => ({
    modalInfo: store.modalInfo,
  }), shallowEqual);

  return (
    <div className={styles.block}>
      <img src={modalInfo.element.image_large} className={styles.img} alt={modalInfo.element.name}></img>
      <div className={styles.info}>
        <p className="text text_type_main-medium">
          {modalInfo.element.name}
        </p>
        <div className={styles.pfc}>
          <div className={styles.pfc_element}>
            <p className="text text_type_main-small text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {modalInfo.element.calories}
            </p>
          </div>
          <div className={styles.pfc_element}>
            <p className="text text_type_main-small text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {modalInfo.element.proteins}
            </p>
          </div>
          <div className={styles.pfc_element}>
            <p className="text text_type_main-small text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {modalInfo.element.fat}
            </p>
          </div>
          <div className={styles.pfc_element}>
            <p className="text text_type_main-small text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {modalInfo.element.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;