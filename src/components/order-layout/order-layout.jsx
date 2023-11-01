import OrderInfo from '../order-info/order-info';
import styles from './order-layout.module.css';

function OrderLayout({ isUser, ingredients }) {

  return (
    <>
      { Object.keys(ingredients).length ?
        <OrderInfo isUser={isUser} ingredients={ ingredients } />
        : 
        <div className={styles.loading}>
            <h1 className='text text_type_main-medium'>
              Получаем информацию...
            </h1>
            <span className={styles.loader}></span>
          </div>
      }
    </>
  )
}

export default OrderLayout;