import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { ingredientPropType } from '../../utils/prop-types';
import { TAB_VALUES } from '../../utils/constants';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { chosenIngredientsSlice } from '../../services/chosen-ingredients';
import { modalInfoSlice } from '../../services/modal-info';
import { modalVisibilitySlice } from '../../services/modal-visibility';

function Ingredient({ element }) {
  const { chosenIngredients } = useSelector(store => ({
    chosenIngredients: store.chosenIngredients,
  }), shallowEqual);
  const dispatch = useDispatch();
  const { add } = chosenIngredientsSlice.actions;
  const { addModalInfo } = modalInfoSlice.actions;
  const { openModal } = modalVisibilitySlice.actions;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: element,
  });

  const addIngredient = (e, element) => {
    e.preventDefault();
    const type = element.type === TAB_VALUES.bun ? element.type : TAB_VALUES.other;
    const newChosenIngredients = JSON.parse(JSON.stringify(chosenIngredients));

    if (!newChosenIngredients[type]) {
      newChosenIngredients[type] = [];
      newChosenIngredients[type].push(element);
    } else if (type !== TAB_VALUES.bun) {
        newChosenIngredients[type].push(element);
    } else {
      newChosenIngredients[type] = [element];  
    }

    dispatch(add(newChosenIngredients));
  }

  const isAdded = () => {
    const type = element.type === TAB_VALUES.bun ? TAB_VALUES.bun : TAB_VALUES.other;
    const amount = (chosenIngredients[type] || []).reduce((acc, el) => el._id === element._id ? acc + 1 : acc, 0);

    return amount || undefined;
  }

  const addInfoAndOpenModal = (element) => {
    const info = {
      header: 'Детали ингредиента',
      ingredient: true,
      element,
    }

    dispatch(addModalInfo(info));
    dispatch(openModal());
  }

  return (
    <div className={styles.item} onClick={(e) => addIngredient(e, element)} ref={dragRef}>
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
