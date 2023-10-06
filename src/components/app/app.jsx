import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { IsVisibleModalContext, ModalInfoContext, IngredientsContext, ChosenIngredientsContext } from '../../services/appContext';

export const TAB_VALUES = {
  bun: 'bun',
  main: 'main',
  sauce: 'sauce',
  other: 'other',
}

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const filterIngredients = (data) => {
    const ingredients = {
      [TAB_VALUES.bun]: [],
      [TAB_VALUES.main]: [],
      [TAB_VALUES.sauce]: [],
    }
    data.forEach(element => {
      const type = element.type;
      ingredients[type].push(element);
    });

    return ingredients;
  }

  const isVisibleModalInitialState = { isVisible: false };

  const isModalVisibleReducer = (state, action) => {
    switch (action.type) {
      case 'open':
        return { isVisible: true };
      case 'close':
        return isVisibleModalInitialState;
      default: 
      return isVisibleModalInitialState;
    }
  }
  const [isVisibleModal, isVisibleModalDispatcher] = React.useReducer(isModalVisibleReducer, isVisibleModalInitialState);

  const modalInfoInitialState = {};

  const modalReducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return action.data;
      case 'remove':
        return modalInfoInitialState;
      default: 
      return modalInfoInitialState;
    }
  }
  const [modalInfo, modalInfoDispatcher] = React.useReducer(modalReducer, modalInfoInitialState);
  const ingredientsInitialState = filterIngredients(data);

  const ingredientsReducer = (state, action) => {
    switch (action.type) {
      case 'set':
        return action.data;
      default: 
      return ingredientsInitialState;
    }
  }
  const [ingredients, ingredientsDispatcher] = React.useReducer(ingredientsReducer, ingredientsInitialState);
  const [bun] = Object.values(ingredients[TAB_VALUES.bun]);

  const chosenIngredientsInitialState = {
    [TAB_VALUES.bun]: [{ ...bun, count: 1 }],
  };

  const chosenIngredientsReducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return action.data;
      case 'remove':
        return action.data;
      case 'removeAll':
        return chosenIngredientsInitialState;
      default: 
      return chosenIngredientsInitialState;
    }
  }
  const [chosenIngredients, chosenIngredientsDispatcher] = React.useReducer(chosenIngredientsReducer, chosenIngredientsInitialState);

  React.useEffect(() => {
    fetch(URL)
      .then(res => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка ${JSON.stringify(res)}`);
      })
      .then(data => filterIngredients(data.data))
      .then(data => {
        ingredientsDispatcher({ type: 'set', data });
        const [bun] = Object.values(data[TAB_VALUES.bun]);
        const newChosenIngredients = {
          [TAB_VALUES.bun]: [{ ...bun, count: 1 }],
        }

        chosenIngredientsDispatcher({
          type: 'add',
          data: newChosenIngredients,
        });
      })
      .catch(console.error);
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <IsVisibleModalContext.Provider value={{ isVisibleModal, isVisibleModalDispatcher }}>
        <ModalInfoContext.Provider value={{ modalInfo, modalInfoDispatcher }}>
          <IngredientsContext.Provider value={{ ingredients }}>
            <ChosenIngredientsContext.Provider value={{ chosenIngredients, chosenIngredientsDispatcher }}>
              <main className={styles.main}>
                <BurgerIngredients />
                <BurgerConstructor />
              </main>
                { isVisibleModal.isVisible && 
                  <Modal >
                      { modalInfo?.ingredient && <IngredientDetails /> }
                      { modalInfo?.order && <OrderDetails />}
                  </Modal>
                }
            </ChosenIngredientsContext.Provider>
          </IngredientsContext.Provider>
        </ModalInfoContext.Provider>
      </IsVisibleModalContext.Provider>
    </div>
  );
}

export default App;