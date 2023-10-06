import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { TAB_VALUES } from '../app/app';
import { ingredientPropType } from '../../utils/prop-types';
import { IsVisibleModalContext, ModalInfoContext, ChosenIngredientsContext } from '../../services/appContext';

function Ingredient({ element }) {
  const { isVisibleModalDispatcher } = React.useContext(IsVisibleModalContext);
  const { modalInfoDispatcher } = React.useContext(ModalInfoContext);
  const { chosenIngredients, chosenIngredientsDispatcher } = React.useContext(ChosenIngredientsContext);

  const addIngredient = (e, element) => {
    e.preventDefault();
    const type = element.type === TAB_VALUES.bun ? element.type : TAB_VALUES.other;
    const id = element._id;
    let newChosenIngredients = { ...chosenIngredients };

    if (!newChosenIngredients[type]) {
      newChosenIngredients[type] = [];  
      newChosenIngredients[type].push({ ...element, count: 1 });
    } else {
      if (newChosenIngredients[type]) {
        const el = newChosenIngredients[type].find((item) => item._id === id)

        if (el && type !== TAB_VALUES.bun) {
          el.count++;
        } else {
          if (type !== TAB_VALUES.bun) {
            newChosenIngredients[type].push({ ...element, count: 1 });
          } else {
            newChosenIngredients[type] = [{ ...element, count: 1 }];  
          }
        }
      }
    }

    chosenIngredientsDispatcher({
      type: 'add',
      data: newChosenIngredients,
    });
  }

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

    modalInfoDispatcher({ type: 'add', data: info });
    isVisibleModalDispatcher({ type: 'open' });
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
  element: ingredientPropType,
}; 
