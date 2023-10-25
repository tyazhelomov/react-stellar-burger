import { useEffect } from 'react';
import IngredientInfo from '../ingredient-info/ingredient-info';
import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getIngredient } from '../../services/actions/get-ingredients';

function IngredientDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { ingredient } = useSelector(store => ({
    ingredient: store.ingredient,
  }), shallowEqual);

  useEffect(() => {
    dispatch(getIngredient(id));
  }, [dispatch, id])

  return (
    <div className={styles.block}>
      <IngredientInfo ingredient={ingredient.element} />
    </div>
  )
}

export default IngredientDetails;