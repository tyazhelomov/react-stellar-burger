import styles from './order-details.module.css';
import doneImage from '../../images/done.svg';
import cat from '../../images/cat.png';
import { shallowEqual } from 'react-redux';
import { FC } from 'react';
import { useAppSelector } from '../../hooks/hooks';

const OrderDetails: FC = () => {
  const { modalInfo } = useAppSelector(store => ({
    modalInfo: store.modalInfo,
  }), shallowEqual);

  return (
    <div className={styles.block}>
      { modalInfo.loading && 
        <>
          <p className={`${styles.order_id} text text_type_main-medium`}>
            Отправляем заказ на кухню
          </p>
          <span className={styles.loader}></span>
        </>
      }
      { modalInfo.error && 
        <>
          <p className={`${styles.order_id} text text_type_main-medium`}>
            Произошла ошибка, уже исправляем
          </p>
          <img className={styles.cat} src={cat} alt='error' />
        </>
      }
      { modalInfo.orderNumber && 
        <>
          <div className={styles.order_number}>
            <p className="text text_type_digits-large">{ modalInfo.orderNumber }</p>
          </div>
          <p className={`${styles.order_id} text text_type_main-medium`}>
            идентификатор заказа
          </p>
          <img className={styles.img} src={doneImage} alt='done'/>
          <p className={`${styles.ready_to_cook} text text_type_main-small`}>
            Ваш заказ начали готовить
          </p>
          <p className={`${styles.waiting_text} text text_type_main-small text_color_inactive`}>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      }
    </div>
  )
}

export default OrderDetails;