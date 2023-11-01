import React from 'react';
import styles from './order-list.module.css'
import OrderItem from '../order-item/order-item';

const OrderList = ({ socketState, isProfile = false }) => {
  const isSocketConnected = socketState.wsConnected && socketState.messages?.orders?.length;
  const orders = socketState.messages?.orders;

  const renderLoop = () => {
    let ordersReverse;
    if (isProfile) {
      ordersReverse = [...orders].reverse();
    } else {
      ordersReverse = orders;
    }

    const render = ordersReverse.reduce((acc, el) => {
      acc.push(<OrderItem key={ el._id } element={ el } isProfile={ isProfile } />)
      return acc;
    }, [])

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
