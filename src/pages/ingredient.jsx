import { useEffect } from "react";
import styles from './ingredient.module.css'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useParams } from "react-router-dom";
import { getIngredient } from "../services/actions/get-ingredients";

function IngredientPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userState, ingredient, errorState } = useSelector(store => ({
    userState: store.userState,
    ingredient: store.ingredient,
    errorState: store.errorState,
  }), shallowEqual);

  useEffect(() => {
    dispatch(getIngredient(id));
  }, [dispatch, id])

  const navigate = useNavigate();

  const returnUser = () => {
    navigate('/');
  }

  return (
    <div className={styles.main}>
    { userState.isLoading &&
      <>
        <h1 className='text text_type_main-medium'>
          Получаем информацию об ингредиенте...
        </h1>
        <span className={styles.loader}></span>
      </>
    }
    { !userState.isLoading && ingredient._id &&
      <>
        <h1 className='text text_type_main-large'>
          Детали ингредиента
        </h1>
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
      <>
        <p className={`${ styles.error } text text_type_main-medium`}>
          { errorState.errorMsg }
        </p>
        <div className={styles.button}>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={returnUser}
          >
            На главную
          </Button>
        </div>
      </>
    }
    </div>
  );
}

export default IngredientPage;