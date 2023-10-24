import React from 'react';
import styles from './ingredient-details.module.css';

function IngredientDetails() {
  console.log('IngredientDetails')
  const modalInfoLocalStorage = JSON.parse(localStorage.getItem('modal-info'));

  return (
    <div className={styles.block}>
      <img src={modalInfoLocalStorage.element.image_large} className={styles.img} alt={modalInfoLocalStorage.element.name}></img>
      <div className={styles.info}>
        <p className="text text_type_main-medium">
          {modalInfoLocalStorage.element.name}
        </p>
        <div className={styles.pfc}>
          <div className={styles.pfc_element}>
            <p className="text text_type_main-small text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {modalInfoLocalStorage.element.calories}
            </p>
          </div>
          <div className={styles.pfc_element}>
            <p className="text text_type_main-small text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {modalInfoLocalStorage.element.proteins}
            </p>
          </div>
          <div className={styles.pfc_element}>
            <p className="text text_type_main-small text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {modalInfoLocalStorage.element.fat}
            </p>
          </div>
          <div className={styles.pfc_element}>
            <p className="text text_type_main-small text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {modalInfoLocalStorage.element.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;