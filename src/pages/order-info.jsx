import { useEffect } from "react";
import styles from './order-info.module.css'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getIngredients } from "../services/actions/get-ingredients";
import { WS_ENDPOINTS, WS_URL } from "../utils/constants";
import OrderInfo from "../components/order-info/order-info";
import { WS_ALL_CLOSE, WS_ALL_CONNECTION_START, WS_OWNER_CLOSE, WS_OWNER_CONNECTION_START } from "../services/actions/socket";

function OrderInfoPage({ isUser = false, ingredients }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { userState, wsOwnerState, wsAllState } = useSelector(store => ({
    userState: store.userState,
    wsOwnerState: store.wsOwnerState,
    wsAllState: store.wsAllState,
  }), shallowEqual);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  useEffect(
    () => {
      if (isUser) {
        const token = localStorage.getItem('accessToken');
        dispatch({ type: WS_OWNER_CONNECTION_START, url: `${ WS_URL }${ WS_ENDPOINTS.OWNER }?token=${ userState.token || token }` });
      } else {
        dispatch({ type: WS_ALL_CONNECTION_START, url: `${ WS_URL }${ WS_ENDPOINTS.ALL }` });
      }
      
      return () => {
        dispatch({ type: WS_OWNER_CLOSE });
        dispatch({ type: WS_ALL_CLOSE });
      };
    },
    [dispatch, isUser, userState.token]
  );

  const isSocketConnected = 
    isUser ? wsOwnerState.wsConnected && wsOwnerState.messages?.orders?.length
    : wsAllState.wsConnected && wsAllState.messages?.orders?.length && !userState.isLoading;
    
  let order;

  if (isSocketConnected && isUser) {
    order = wsOwnerState.messages?.orders?.find(el => el.number === +id)
  } else {
    order = wsAllState.messages?.orders?.find(el => el.number === +id)
  }

  return (
    <div className={styles.main}>
      { !isSocketConnected &&
        <>
          <h1 className='text text_type_main-medium'>
            Получаем информацию о заказе...
          </h1>
          <span className={styles.loader}></span>
        </>
      }
      { isSocketConnected &&
        <OrderInfo element={order} ingredients={ingredients} />
      }
    </div>
  );
}

export default OrderInfoPage;