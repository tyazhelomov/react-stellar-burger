import styles from './ingredient-info.module.css';

function IngredientInfo({ ingredient }) {
  return (
    <>
      <img src={ingredient.image_large} className={styles.img} alt={ingredient.name}></img>
      <div className={styles.info}>
        <p className="text text_type_main-medium">
          {ingredient.name}
        </p>
        <div className={styles.pfc}>
          <div className={styles.pfc_element}>
            <p className="text text_type_main-small text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.calories}
            </p>
          </div>
          <div className={styles.pfc_element}>
            <p className="text text_type_main-small text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.proteins}
            </p>
          </div>
          <div className={styles.pfc_element}>
            <p className="text text_type_main-small text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.fat}
            </p>
          </div>
          <div className={styles.pfc_element}>
            <p className="text text_type_main-small text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default IngredientInfo;