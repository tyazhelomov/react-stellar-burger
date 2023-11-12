import { FC } from 'react';
import styles from './order-list.module.css'
import OrderItem from '../order-item/order-item';
import { IFeed, IFeedMessage, IOrder } from '../../services/types/socket';

interface IOrderList {
  socketState: IFeed;
  isProfile?: boolean;
}

const OrderList: FC<IOrderList> = ({ socketState, isProfile = false }) => {
  const wsMessages = socketState.messages as IFeedMessage;
  const isSocketConnected: boolean = socketState.wsConnected && !!wsMessages.orders?.length;
  const { orders } = wsMessages as IFeedMessage;

  const renderLoop = () => {
    let ordersReverse: Array<IOrder>;
    if (isProfile) {
      ordersReverse = [...orders].reverse();
    } else {
      ordersReverse = orders;
    }

    const acc: Array<JSX.Element> = [];

    const render = ordersReverse.reduce((acc, el) => {
      acc.push(<OrderItem key={ el._id } element={ el } isProfile={ isProfile } />)

      return acc;
    }, acc)

    return render;
  }

  return (
    <section className={styles.section}>
      { !isSocketConnected &&
        <div className={styles.loading}>
          <h1 className='text text_type_main-medium'>
            Получаем информацию...
          </h1>
          <span className={styles.loader}></span>
        </div>
      }
      { isSocketConnected &&
        <>
          { renderLoop() }
        </>
      }
    </section>
  )
}

export default OrderList;
