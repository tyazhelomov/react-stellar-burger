import styles from './order-details.module.css';
import doneImage from '../../images/done.svg';

function OrderDetails() {
  return (
    <div className={styles.block}>
      <div className={styles.order_number}>
        <p className="text text_type_digits-large">{Math.floor(Math.random() * 1000000)}</p>
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
    </div>
  )
}

export default OrderDetails;