import styles from './order-details.module.css';
import doneImage from '../../images/done.svg';
import { modalInfoPropType } from '../../utils/prop-types';

function OrderDetails() {
  return (
    <div className={styles.block}>
      <div className={styles.order_number}>
        <p className="text text_type_digits-large">{Math.floor(Math.random() * 1000000)}</p>
      </div>
      <p style={{textAlign:'center', marginTop: '10px'}} className="text text_type_main-medium">
        идентификатор заказа
      </p>
      <img style={{maxWidth:'120px', margin:'50px auto'}} src={doneImage} alt='done'/>
      <p style={{textAlign:'center'}} className="text text_type_main-small">
        Ваш заказ начали готовить
      </p>
      <p style={{textAlign:'center', marginTop: '10px'}} className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default OrderDetails;

OrderDetails.propTypes = {
  modalInfo: modalInfoPropType,
}; 