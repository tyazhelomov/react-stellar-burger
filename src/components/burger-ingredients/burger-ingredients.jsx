import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import Ingredient from '../ingredient/ingredient';
import { TAB_VALUES } from '../app/app';
import { funcPropType, ingredientsObjectPropType } from '../../utils/prop-types';

const TAB_NAMES = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
}

const BurgerIngredients = ({ ingredients, chosenIngredients, addIngredient, openModal }) => {
  const [current, setCurrent] = React.useState(TAB_VALUES.bun);

  const renderLoop = () => {
    const render = [];
    for(const element in ingredients) {
      render.push(
        <div key={element}>
          <div className={styles.category}>
            <h2 className="text text_type_main-medium">
              { TAB_NAMES[element] }
            </h2>
          </div>
          <div className={styles.container}>
            {
              ingredients[element].map((item, index) => <Ingredient key={index} chosenIngredients={chosenIngredients} element={item} addIngredient={addIngredient} openModal={openModal}/>)
            }
          </div>
        </div>
      )
    }

    return render;
  }

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large">
        Соберите бургер
      </h1>
      <div className={styles.ingredients}>
        <div style={{ display: 'flex' }}>
          <Tab value={TAB_VALUES.bun} active={current === TAB_VALUES.bun} onClick={setCurrent}>
            {TAB_NAMES.bun}
          </Tab>
          <Tab value={TAB_VALUES.sauce} active={current === TAB_VALUES.sauce} onClick={setCurrent}>
            {TAB_NAMES.sauce}
          </Tab>
          <Tab value={TAB_VALUES.main} active={current === TAB_VALUES.main} onClick={setCurrent}>
            {TAB_NAMES.main}
          </Tab>
        </div>
        <div className={styles.menu}>
          { renderLoop() }
        </div>
      </div>
    </section>
  )
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  ingredients: ingredientsObjectPropType,
  chosenIngredients: ingredientsObjectPropType,
  addIngredient: funcPropType,
  openModal: funcPropType,
}; 