import styles from "./home.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { modalInfoSlice } from "../services/modal-info";
import { modalVisibilitySlice } from "../services/modal-visibility";
import { useCallback } from "react";

function HomePage() {
  const dispatch = useDispatch();
  const { modalInfo, modalVisibility, userState, wsAllState } = useSelector(store => ({
    modalInfo: store.modalInfo,
    modalVisibility: store.modalVisibility,
    userState: store.userState,
    wsAllState: store.wsAllState,
  }), shallowEqual);
  console.log('wsAllState', wsAllState)
  const { removeModalInfo } = modalInfoSlice.actions;
  const { closeModal } = modalVisibilitySlice.actions;

  const closeModalFunc = useCallback(() => {
    dispatch(removeModalInfo());
    dispatch(closeModal());
  }, [closeModal, dispatch, removeModalInfo]);

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
          <Modal onClose={closeModalFunc}>
              { modalInfo?.order && <OrderDetails />}
          </Modal>
        }
      </DndProvider>
  );
}

export default HomePage;