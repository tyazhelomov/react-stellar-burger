import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import Ingredient from '../ingredient/ingredient';
import { TAB_VALUES } from '../app/app';
import { IngredientsContext } from '../../services/appContext';

const TAB_NAMES = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
}

const BurgerIngredients = () => {
  const { ingredients } = React.useContext(IngredientsContext);
  const currentState = { currentTopic: TAB_VALUES.bun };

  const currentReducer = (state, action) => {
    switch (action.type) {
      case 'change':
        return { currentTopic: action.value };
      default: 
      return currentState;
    }
  }
  const [current, currentDispatcher] = React.useReducer(currentReducer, currentState);
  const setCurrent = (value) => {
    currentDispatcher({ type: 'change', value })
  }

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
              ingredients[element].map((item) => <Ingredient key={item._id} element={item} />)
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
        <div className={styles.tab}>
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
