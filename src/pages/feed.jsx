import { useEffect } from "react";
import styles from './feed.module.css';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { WS_ENDPOINTS, WS_URL } from "../utils/constants";
import OrderList from "../components/order-list/order-list";
import { WS_ALL_CLOSE, WS_ALL_CONNECTION_START } from "../services/actions/socket";

function FeedPage() {
  const { userState, wsAllState } = useSelector(store => ({
    userState: store.userState,
    wsAllState: store.wsAllState,
  }), shallowEqual);

  const dispatch = useDispatch();
    useEffect(
    () => {
      dispatch({ type: WS_ALL_CONNECTION_START, url: `${ WS_URL }${ WS_ENDPOINTS.ALL }` });
      
      return () => {
        dispatch({ type: WS_ALL_CLOSE });
      };
    },
    [dispatch]
  );

  const isSocketConnected = wsAllState.wsConnected && wsAllState.messages?.orders?.length && !userState.isLoading;
  const ordersSumAll = wsAllState.messages.total;
  const ordersSumToday = wsAllState.messages.totalToday;

  const getReadyOrders = () => {
    const render = wsAllState.messages?.orders.reduce((acc, el) => {
      if (acc.length < 10 && el.status === 'done') {
        const number = el.number;
        acc.push(
          <div className={ `${ styles.numberReady } text text_type_digits-default` } key={number}>
            { number }
          </div>
        )
      }

      return acc;
    }, [])

    return render;
  }

  const getInProgressOrders = () => {
    const render = wsAllState.messages?.orders.reduce((acc, el) => {
      if (acc.length < 10 && el.status === 'pending') {
        const number = el.number;
        acc.push(
          <div className={ `text text_type_digits-default` } key={number}>
            { number }
          </div>
        )
      }

      return acc;
    }, [])

    return render;
  }

  // Здесь порядок отображения иконок реализовано исходя из корректности отправки заказов другими студентами.
  // Кто то отправляет 2 булки или еще что-то, поэтому отображение может быть не корректно.
  // Основная логика: сперва идет булка, потом иконки ингредиентов, которые не повторяются, затем иконка ингредиента с остатком не отображенных.

  return (
    <>
      <h1 className={`${ styles.header } text text_type_main-large`}>
        Лента заказов
      </h1>
      <section className={styles.section}>
        { !isSocketConnected &&
          <div className={styles.loading}>
            <h2 className='text text_type_main-medium'>
              Получаем информацию...
            </h2>
            <span className={styles.loader}></span>
          </div>
        }
        { isSocketConnected &&
          <>
            <div className={ styles.orderList }>
              <OrderList socketState={ wsAllState } />
            </div>
            <div className={ styles.info }>
              <div className={ styles.statuses }>
                <div className={ styles.ready }>
                  <p className={`text text_type_main-medium`}>
                    Готово:
                  </p>
                  <div className={ styles.numbers }>
                    { getReadyOrders() }
                  </div>
                </div>
                <div className={ styles.progress }>
                  <p className={`text text_type_main-medium`}>
                    В работе:
                  </p>
                  { getInProgressOrders() }
                </div>
              </div>
              <div className={ styles.allOrders }>
                <p className={`text text_type_main-medium`}>
                  Выполнено за все время:
                </p>
                <p className={`${styles.total} text text_type_digits-large`}>
                  { ordersSumAll }
                </p>
              </div>
              <div className={ styles.allOrdersToday }>
                <p className={`text text_type_main-medium`}>
                  Выполнено за сегодня:
                </p>
                <p className={`${styles.total} text text_type_digits-large`}>
                  { ordersSumToday }
                </p>
              </div>
            </div>
          </>
        }
      </section>
    </>
  );
}

export default FeedPage;