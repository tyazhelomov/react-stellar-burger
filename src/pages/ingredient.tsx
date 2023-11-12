import { FC, useEffect } from "react";
import styles from './ingredient.module.css'
import { shallowEqual } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useParams } from "react-router-dom";
import { getIngredient } from "../services/actions/get-ingredients";
import IngredientInfo from "../components/ingredient-info/ingredient-info";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const IngredientPage: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { ingredient, errorState } = useAppSelector(store => ({
    ingredient: store.ingredient,
    errorState: store.errorState,
  }), shallowEqual);

  useEffect(() => {
    if (id) {
      dispatch(getIngredient(id));
    } else {
      navigate('/');
    }
  }, [dispatch, id, navigate])

  const returnUser = () => {
    navigate('/');
  }

  return (
    <div className={styles.main}>
    { ingredient.isLoading &&
      <>
        <h1 className='text text_type_main-medium'>
          Получаем информацию об ингредиенте...
        </h1>
        <span className={styles.loader}></span>
      </>
    }
    { !ingredient.isLoading && ingredient.element?._id &&
      <>
        <h1 className='text text_type_main-large'>
          Детали ингредиента
        </h1>
        <IngredientInfo ingredient={ingredient.element} />
      </>
    }
    { errorState.error && 
      <>
        <p className={`${ styles.error } text text_type_main-medium`}>
          { errorState.errorMsg }
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={returnUser}
          extraClass={ styles.button }
        >
          На главную
        </Button>
      </>
    }
    </div>
  );
}

export default IngredientPage;