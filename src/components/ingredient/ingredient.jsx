import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { TAB_VALUES } from '../app/app';
import { funcPropType, ingredientPropType, ingredientsObjectPropType } from '../../utils/prop-types';

function Ingredient({ element, chosenIngredients, addIngredient, openModal }) {
  const isAdded = () => {
    const type = element.type === TAB_VALUES.bun ? TAB_VALUES.bun : TAB_VALUES.other;
    const item = (chosenIngredients[type] || []).find((el) => el._id === element._id);

    return item?.count;
  }

  const addInfoAndOpenModal = (element) => {
    const info = {
      header: 'Детали ингредиента',
      ingredient: true,
      element,
    }

    openModal(info);
  }

  return (
    <div className={styles.item} onClick={(e) => addIngredient(e, element)}>
      <div>
        { isAdded() && <Counter count={isAdded()} size="small"/>}
      </div>
      <img  className={styles.image} src={element.image} alt={element.name}></img>
      <div className={styles.price}>
        <CurrencyIcon type="primary" />
        <p className="text text_type_digits-default">{ element.price }</p>
      </div>
      <p className="text text_type_main-small" onClick={() => addInfoAndOpenModal(element)}>
        { element.name }
      </p>
    </div>
  )
}

export default Ingredient;

Ingredient.propTypes = {
  chosenIngredients: ingredientsObjectPropType,
  element: ingredientPropType,
  addIngredient: funcPropType,
  openModal: funcPropType,
}; 
