import { useCallback, useEffect } from "react";
import styles from './orders.module.css'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { auth } from "../services/actions/auth";
import { ENDPOINTS, WS_ENDPOINTS, WS_URL } from "../utils/constants";
import { userStateSlice } from "../services/user-state";
import OrderList from "../components/order-list/order-list";
import { WS_OWNER_CLOSE, WS_OWNER_CONNECTION_START } from "../services/actions/socket";

function OrdersPage() {
  const dispatch = useDispatch();
  const { logoutUser } = userStateSlice.actions;
  const { userState, errorState, wsOwnerState } = useSelector(store => ({
    userState: store.userState,
    errorState: store.errorState,
    wsOwnerState: store.wsOwnerState,
  }), shallowEqual);

  useEffect(
    () => {
      const token = localStorage.getItem('accessToken');
      dispatch({ type: WS_OWNER_CONNECTION_START, url: `${ WS_URL }${ WS_ENDPOINTS.OWNER }?token=${ userState.token || token }` });
      
      return () => {
        dispatch({ type: WS_OWNER_CLOSE });
      };
    },
    [dispatch, userState.token]
  );

  const logout = useCallback(
    e => {
      e.preventDefault();
      dispatch(
        auth(
          ENDPOINTS.LOGOUT,
          'POST',
          {
            "token": localStorage.getItem('refreshToken')
          }
        )
      );
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(logoutUser())
    },
    [dispatch, logoutUser]
  );

  return (
    <div className={styles.main}>
      { userState.isLoading &&
        <div className={styles.loading}>
          <h1 className='text text_type_main-medium'>
            Получаем информацию...
          </h1>
          <span className={styles.loader}></span>
        </div>
      }
      { !userState.isLoading &&
        <>
          <div className={styles.links}>
            <NavLink
              to='/profile' end
              className={styles.link}
            >{({ isActive }) => (
              <p className={ 
                isActive
                ? `${styles.link} text text_type_main-medium text_color_primary`
                : `${styles.link} text text_type_main-medium text_color_inactive`}>Профиль</p>
            )}</NavLink>
            <NavLink
              to='/profile/orders' end
              className={styles.link}
            >{({ isActive }) => (
              <p className={ 
                isActive
                ? `${styles.link} text text_type_main-medium text_color_primary`
                : `${styles.link} text text_type_main-medium text_color_inactive`}>История заказов</p>
            )}</NavLink>
            <button className={`${styles.exit} text text_type_main-medium text_color_inactive`} onClick={logout}>
              Выход
            </button>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
              В этом разделе вы можете просмотреть свою историю заказов
            </p>
          </div>
          <OrderList socketState={ wsOwnerState } isProfile={true} />
        </>
      }
      { errorState.error && 
        <p className={`${ styles.error } text text_type_main-small`}>
          { errorState.errorMsg }
        </p>
      }
    </div>
  );
}

export default OrdersPage;