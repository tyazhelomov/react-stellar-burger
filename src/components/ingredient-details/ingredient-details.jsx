import IngredientInfo from '../ingredient-info/ingredient-info';
import styles from './ingredient-details.module.css';

function IngredientDetails() {
  const modalInfoLocalStorage = JSON.parse(localStorage.getItem('modal-info'));

  return (
    <div className={styles.block}>
      <IngredientInfo ingredient={modalInfoLocalStorage.element} />
    </div>
  )
}

export default IngredientDetails;