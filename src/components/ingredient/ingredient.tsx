import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { TAB_VALUES } from '../../utils/constants';
import { shallowEqual } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { FC } from "react";
import { IIngredientInfo } from "../../services/types/ingredient";
import { useAppSelector } from "../../hooks/hooks";

interface IIngredient {
  element: IIngredientInfo;
}

const Ingredient: FC<IIngredient> = ({ element }) => {
  const { chosenIngredients } = useAppSelector(store => ({
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

    return amount || 0;
  }

  const openIngredientInfo = (element: IIngredientInfo) => {
    navigate(`/ingredients/${element._id}`, { state: { background: location, element, from: location }})
  }

  return (
    <div className={styles.item} onClick={() => openIngredientInfo(element)} ref={dragRef}>
      <div>
        { !!isAdded() && <Counter count={isAdded()} size="small"/>}
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