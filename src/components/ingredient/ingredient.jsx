import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { ingredientPropType } from '../../utils/prop-types';
import { TAB_VALUES } from '../../utils/constants';
import { shallowEqual, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";

function Ingredient({ element }) {
  const { chosenIngredients } = useSelector(store => ({
    chosenIngredients: store.chosenIngredients,
  }), shallowEqual);
  const navigate = useNavigate();
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: element,
  });

  const isAdded = () => {
    const type = element.type === TAB_VALUES.bun ? TAB_VALUES.bun : TAB_VALUES.other;
    const amount = (chosenIngredients[type] || []).reduce((acc, el) => el._id === element._id ? acc + 1 : acc, 0);

    return amount || undefined;
  }

  const openIngredientInfo = (element) => {
    navigate(`/ingredients/${element._id}`, { state: { background: location }})
  }

  return (
    <div className={styles.item} onClick={(e) => openIngredientInfo(element)} ref={dragRef}>
      <div>
        { isAdded() && <Counter count={isAdded()} size="small"/>}
      </div>
      <img  className={styles.image} src={element.image} alt={element.name}></img>
      <div className={styles.price}>
        <CurrencyIcon type="primary" />
        <p className="text text_type_digits-default">{ element.price }</p>
      </div>
      <p className="text text_type_main-small">
        { element.name }
      </p>
    </div>
  )
}

export default Ingredient;

Ingredient.propTypes = {
  element: ingredientPropType,
}; 
