import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './chosen-ingredients.module.css';
import { chosenIngredientsSlice } from '../../services/chosen-ingredients';
import { TAB_VALUES } from '../../utils/constants';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

function ChosenIngredient({ element, index }) {
  const { chosenIngredients } = useSelector(store => ({
    chosenIngredients: store.chosenIngredients,
  }), shallowEqual);
  const { add, remove } = chosenIngredientsSlice.actions;
  const dispatch = useDispatch();

  const [, dragIngredientRef] = useDrag({
    type: "chosenIngredient",
    item: { element, index },
  });

  const [, dropChosenRef] = useDrop({
    accept: 'chosenIngredient',
    drop(data) {
      changeIngredient(data);
    },
  });

  const changeIngredient = (data) => {
    const elementIndex = data.index;
    const targetIndex = index;
    const newChosenIngredients = JSON.parse(JSON.stringify(chosenIngredients));

    const tempEl = newChosenIngredients[TAB_VALUES.other][elementIndex];
    newChosenIngredients[TAB_VALUES.other][elementIndex] = newChosenIngredients[TAB_VALUES.other][targetIndex];
    newChosenIngredients[TAB_VALUES.other][targetIndex] = tempEl;

    dispatch(add(newChosenIngredients));
  }

  const removeIngredient = (ingredient) => {
    const id = ingredient._id;
    const addedIngredients = JSON.parse(JSON.stringify(chosenIngredients));
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