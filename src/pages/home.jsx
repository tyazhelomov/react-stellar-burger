import styles from "./home.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/actions/get-ingredients";

function HomePage() {
  const { modalInfo, modalVisibility, userState } = useSelector(store => ({
    modalInfo: store.modalInfo,
    modalVisibility: store.modalVisibility,
    userState: store.userState,
  }), shallowEqual);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <DndProvider backend={ HTML5Backend }>
      <main className={styles.main}>
        { userState.isLoading &&
          <div className={styles.loading}>
            <h1 className='text text_type_main-medium'>
              Загружаем...
            </h1>
            <span className={styles.loader}></span>
          </div>
        }
        { !userState.isLoading &&
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        }
      </main>
        { modalVisibility.isVisible && 
          <Modal >
              { modalInfo?.order && <OrderDetails />}
          </Modal>
        }
      </DndProvider>
  );
}

export default HomePage;