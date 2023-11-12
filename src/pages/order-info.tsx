import { FC, useEffect } from "react";
import styles from './order-info.module.css'
import { shallowEqual } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getIngredients } from "../services/actions/get-ingredients";
import { WS_ENDPOINTS, WS_URL } from "../utils/constants";
import OrderInfo from "../components/order-info/order-info";
import { WS_ALL_CLOSE, WS_ALL_CONNECTION_START, WS_OWNER_CLOSE, WS_OWNER_CONNECTION_START } from "../services/actions/socket";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { IIngredients } from "../services/types/ingredient";
import { IFeedMessage, IOrder } from "../services/types/socket";

interface IOrderInfoPage {
  isUser?: boolean;
  ingredients: IIngredients;
}

const OrderInfoPage: FC<IOrderInfoPage> = ({ isUser = false, ingredients }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { userState, wsOwnerState, wsAllState } = useAppSelector(store => ({
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

  const wsOwnerMessages = wsOwnerState.messages as IFeedMessage;
  const wsAllMessages = wsAllState.messages as IFeedMessage;

  const isSocketConnected = 
    isUser ? wsOwnerState.wsConnected && wsOwnerMessages.orders?.length
    : wsAllState.wsConnected && wsAllMessages.orders?.length && !userState.isLoading;
    
  let order: IOrder | undefined;

  if (id) {
    if (isSocketConnected && isUser) {
      order = wsOwnerMessages.orders?.find(el => el.number === +id)
    } else {
      order = wsAllMessages.orders?.find(el => el.number === +id)
    }
  } else {
    navigate('/');
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