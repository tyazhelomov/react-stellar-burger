import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import Ingredient from '../ingredient/ingredient';
import { TAB_NAMES, TAB_VALUES } from '../../utils/constants';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { currentTabSlice } from '../../services/current-tab';

const BurgerIngredients = () => {
  const { ingredients, currentTab } = useSelector(store => ({
    ingredients: store.ingredients,
    currentTab: store.currentTab,
  }), shallowEqual);
  const dispatch = useDispatch();
  const { changeTab } = currentTabSlice.actions;

  const setCurrent = (value) => {
    dispatch(changeTab(value));
    refs[value].current.scrollIntoView({ behavior: 'smooth' });
  }

  const refs = {
    [TAB_VALUES.bun]: React.useRef(null),
    [TAB_VALUES.main]: React.useRef(null),
    [TAB_VALUES.sauce]: React.useRef(null),
  }
  
  const onScrollHandler = () => {
    let newCurrentTab = currentTab;

    for (const category of Object.keys(refs)) {
        const rect = refs[category].current.getBoundingClientRect();

        if (rect.bottom >= 250 && rect.top < 200) {
          newCurrentTab = category;
          break;
        }
    }
    if (currentTab !== newCurrentTab) {
        dispatch(changeTab(newCurrentTab));
    }
  }

  const renderLoop = () => {
    const render = [];
    for(const element in ingredients) {
      render.push(
        <div key={element} id={element} ref={refs[element]}>
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
          <Tab value={TAB_VALUES.bun} active={currentTab.currentTopic === TAB_VALUES.bun} onClick={setCurrent}>
            {TAB_NAMES.bun}
          </Tab>
          <Tab value={TAB_VALUES.main} active={currentTab.currentTopic === TAB_VALUES.main} onClick={setCurrent}>
            {TAB_NAMES.main}
          </Tab>
          <Tab value={TAB_VALUES.sauce} active={currentTab.currentTopic === TAB_VALUES.sauce} onClick={setCurrent}>
            {TAB_NAMES.sauce}
          </Tab>
        </div>
        <div className={styles.menu} onScroll={onScrollHandler}>
          { renderLoop() }
        </div>
      </div>
    </section>
  )
}

export default BurgerIngredients;
