import { useEffect } from "react";
import styles from './ingredient.module.css'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useParams } from "react-router-dom";
import { getIngredient } from "../services/actions/get-ingredients";
import IngredientInfo from "../components/ingredient-info/ingredient-info";

function IngredientPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { ingredient, errorState } = useSelector(store => ({
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

  console.log(ingredient)

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