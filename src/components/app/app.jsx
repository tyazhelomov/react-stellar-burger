import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React from "react";
import Modal from "../modal/modal";
import ModalElement from "../modal-element/modal-element";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

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

  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const [modalInfo, setModalInfo] = React.useState();
  const openModal = element => {
    setModalInfo(element);
    setIsVisibleModal(true);
  };
  const closeModal = () => {
    setModalInfo();
    setIsVisibleModal(false)
  };
  const [ingredients, setIngredients] = React.useState(filterIngredients(data));
  const [bun] = Object.values(ingredients[TAB_VALUES.bun]);
  const [chosenIngredients, setChosenIngredients] = React.useState({
    [TAB_VALUES.bun]: [{ ...bun, count: 1 }],
  });

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

    setChosenIngredients(newChosenIngredients)
  }

  const removeIngredient = (ingredient) => {
    const id = ingredient._id;
    const addedIngredients = { ...chosenIngredients };
    const index = addedIngredients[TAB_VALUES.other].findIndex((item) => item._id === id);
    addedIngredients[TAB_VALUES.other].splice(index, 1);
    setChosenIngredients(addedIngredients);
  }

  const removeAllIngredients = () => {
    setChosenIngredients({
      [TAB_VALUES.bun]: [{ ...bun, count: 1 }],
    });
  }

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
        setIngredients(data);
        const [bun] = Object.values(data[TAB_VALUES.bun]);
        const newChosenIngredients = {
          [TAB_VALUES.bun]: [{ ...bun, count: 1 }],
        }
        setChosenIngredients(newChosenIngredients);
      })
      .catch(console.error);
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} chosenIngredients={chosenIngredients} addIngredient={addIngredient} openModal={openModal}/>
        <BurgerConstructor chosenIngredients={chosenIngredients} removeIngredient={removeIngredient} removeAllIngredients={removeAllIngredients} openModal={openModal}/>
      </main>
        { isVisibleModal && 
          <Modal>
            <ModalElement modalInfo={modalInfo} closeModal={closeModal}>
              { modalInfo?.ingredient && <IngredientDetails modalInfo={ modalInfo } /> }
              { modalInfo?.order && <OrderDetails modalInfo={ modalInfo } />}
            </ModalElement>
          </Modal>
        }
    </div>
  );
}

export default App;