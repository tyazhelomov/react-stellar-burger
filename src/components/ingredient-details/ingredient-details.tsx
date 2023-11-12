import { FC } from 'react';
import IngredientInfo from '../ingredient-info/ingredient-info';
import styles from './ingredient-details.module.css';
import { useLocation } from 'react-router-dom';
import { IIngredientInfo } from '../../services/types/ingredient';

const IngredientDetails: FC = () => {
  const location = useLocation();

  const ingredient: IIngredientInfo = location.state.element;

  return (
    <div className={styles.block}>
      <IngredientInfo ingredient={ ingredient } />
    </div>
  )
}

export default IngredientDetails;