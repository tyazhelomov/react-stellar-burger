import { shallowEqual } from 'react-redux';
import styles from './ingredient-info.module.css';
import { FC } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { IIngredientInfo } from '../../services/types/ingredient';

interface IIngredient {
  ingredient: IIngredientInfo;
}

const IngredientInfo: FC<IIngredient> = ({ ingredient }) => {
  const { ingredientState, errorState } = useAppSelector(store => ({
    ingredientState: store.ingredient,
    errorState: store.errorState,
  }), shallowEqual);

  return (
    <>
      { ingredientState.isLoading &&
        <span className={styles.loader}></span>
      }
      { !ingredientState.isLoading && ingredient?._id &&
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
      }
      { errorState.error && 
        <p className={`${ styles.error } text text_type_main-medium`}>
          { errorState.errorMsg }
        </p>
      }
    </>
  )
}

export default IngredientInfo;