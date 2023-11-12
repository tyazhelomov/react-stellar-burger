import { FC } from 'react';
import OrderInfo from '../order-info/order-info';
import styles from './order-layout.module.css';
import { IIngredients } from '../../services/types/ingredient';

interface IOrderLayout {
  ingredients: IIngredients;
}

const OrderLayout: FC<IOrderLayout> = ({ ingredients }) => {
  return (
    <>
      { Object.keys(ingredients).length ?
        <OrderInfo ingredients={ ingredients } />
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