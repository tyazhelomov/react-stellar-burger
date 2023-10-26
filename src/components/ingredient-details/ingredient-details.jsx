import IngredientInfo from '../ingredient-info/ingredient-info';
import styles from './ingredient-details.module.css';
import { useLocation } from 'react-router-dom';

function IngredientDetails() {
  const location = useLocation();

  const ingredient = location.state.element;

  return (
    <div className={styles.block}>
      <IngredientInfo ingredient={ ingredient } />
    </div>
  )
}

export default IngredientDetails;