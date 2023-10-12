import styles from "./app.module.css";
import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/get-ingredients";

function App() {
  const { modalInfo, modalVisibility } = useSelector(store => ({
    ingredients: store.ingredients,
    modalInfo: store.modalInfo,
    modalVisibility: store.modalVisibility,
  }), shallowEqual);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <DndProvider backend={ HTML5Backend }>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
          { modalVisibility.isVisible && 
            <Modal >
                { modalInfo?.ingredient && <IngredientDetails /> }
                { modalInfo?.order && <OrderDetails />}
            </Modal>
          }
        </DndProvider>
    </div>
  );
}

export default App;