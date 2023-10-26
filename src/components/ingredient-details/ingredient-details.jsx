import IngredientInfo from '../ingredient-info/ingredient-info';
import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { TAB_VALUES } from '../../utils/constants';

function IngredientDetails() {
  const { id } = useParams();
  const { ingredients } = useSelector(store => ({
    ingredients: store.ingredients,
  }), shallowEqual);

  const ingredient = [
    ...ingredients[TAB_VALUES.bun],
    ...ingredients[TAB_VALUES.main],
    ...ingredients[TAB_VALUES.sauce],
  ].find(el => el._id === id);

  return (
    <div className={styles.block}>
      <IngredientInfo ingredient={ingredient} />
    </div>
  )
}

export default IngredientDetails;