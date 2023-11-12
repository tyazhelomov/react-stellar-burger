import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './chosen-ingredients.module.css';
import { chosenIngredientsSlice } from '../../services/chosen-ingredients';
import { TAB_VALUES } from '../../utils/constants';
import { shallowEqual } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { FC } from 'react';
import { IIngredientInfo, IIngredients } from '../../services/types/ingredient';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export interface IChosenIngredient {
  element: IIngredientInfo;
  index: number;
}

const ChosenIngredient: FC<IChosenIngredient> = ({ element, index }) => {
  const { chosenIngredients } = useAppSelector(store => ({
    chosenIngredients: store.chosenIngredients,
  }), shallowEqual);
  const { add, remove } = chosenIngredientsSlice.actions;
  const dispatch = useAppDispatch();

  const [, dragIngredientRef] = useDrag({
    type: "chosenIngredient",
    item: { element, index },
  });

  const [, dropChosenRef] = useDrop({
    accept: 'chosenIngredient',
    drop(data: IChosenIngredient) {
      changeIngredient(data);
    },
  });

  const changeIngredient = (data: IChosenIngredient) => {
    const elementIndex = data.index;
    const targetIndex = index;
    const newChosenIngredients: IIngredients = JSON.parse(JSON.stringify(chosenIngredients));

    const tempEl = newChosenIngredients[TAB_VALUES.other][elementIndex];
    newChosenIngredients[TAB_VALUES.other][elementIndex] = newChosenIngredients[TAB_VALUES.other][targetIndex];
    newChosenIngredients[TAB_VALUES.other][targetIndex] = tempEl;

    dispatch(add(newChosenIngredients));
  }

  const removeIngredient = (ingredient: IIngredientInfo) => {
    const id = ingredient._id;
    const addedIngredients: IIngredients = JSON.parse(JSON.stringify(chosenIngredients));
    const index = addedIngredients[TAB_VALUES.other].findIndex((item) => item._id === id);
    addedIngredients[TAB_VALUES.other].splice(index, 1);

    dispatch(remove(addedIngredients));
  }

  return (
    <div ref={dropChosenRef}>
      <div className={styles.element} ref={dragIngredientRef}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={element.name}
          price={element.price}
          thumbnail={element.image}
          handleClose={() => removeIngredient(element)}
        />
      </div>
    </div>
  )
}

export default ChosenIngredient;
