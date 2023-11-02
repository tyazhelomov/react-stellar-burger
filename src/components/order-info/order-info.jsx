import styles from './order-info.module.css';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { MONTHS_MAP, STATUS_MAP, TAB_VALUES } from '../../utils/constants';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderInfo({ element = {}, ingredients }) {
  const location = useLocation();
  const order = location.state?.element || element;

  const allIngredients = [...ingredients[TAB_VALUES.bun], ...ingredients[TAB_VALUES.main], ...ingredients[TAB_VALUES.sauce]];

  const getCost = () => {
    const ingredients = order.ingredients;
    const cost = ingredients.reduce((acc, el) => {
      const ingredientState = allIngredients.find(ingredient => ingredient._id === el);

      if (ingredientState.type === TAB_VALUES.bun) {
        acc += ingredientState.price * 2;
      } else {
        acc += ingredientState.price;
      }
      
      return acc;
    }, 0)

    return (
      <>
        <p className="text text_type_digits-default">
          { cost }
        </p>
        <CurrencyIcon type="primary" />
      </>
    );
  }
  const name = order.name;
  const number = `#${ order.number }`;
  const dateOfOrder = moment(order.updatedAt).date();
  const monthOfOrder = moment(order.updatedAt).month() + 1;
  const dayToday = moment().date();
  const monthToday = moment().month() + 1;
  const dayYesterday = moment().add(-1, 'd').date();
  const monthYesterday = moment().add(-1, 'd').month() + 1;

  const day =
    dateOfOrder === dayToday && monthOfOrder === monthToday ? 'Сегодня'
    : dateOfOrder === dayYesterday && monthOfOrder === monthYesterday ? 'Вчера'
    : `${ dateOfOrder } ${ MONTHS_MAP[monthOfOrder] }`;

  const time = moment(order.updatedAt).format('HH:mm');
  const gmt = moment(order.updatedAt).utcOffset() / 60;
  const gmtText = `i-GMT${ gmt >= 0 ? `+${ gmt }` : `-${ gmt }` }`;

  const status = STATUS_MAP[order.status];

  const renderIngredients = () => {
    const ingredients = order.ingredients;

    const configureMap = ingredients.reduce((acc, el) => {
      if (!acc[el]) {
        acc[el] = 1;
      } else {
        acc[el] += 1;
      }

      return acc;
    }, {});

    const render = Object.keys(configureMap).reduce((acc, el) => {
      const ingredientState = allIngredients.find(ingredient => ingredient._id === el);
      let amount = 1;

      if (ingredientState.type === TAB_VALUES.bun) {
        amount = 2;
      } else {
        amount = configureMap[el];
      }

      const price = ingredientState.price;

      acc.push(
        <div className={styles.ingredient} key={`${el}`}>
          <div className={ styles.pic }>
            <div className={styles.border}>
              <img className={styles.image} src={ ingredientState.image_mobile } alt={ ingredientState.name } />
            </div>
          </div>
          <p className={`${styles.ingredientName} text text_type_main-small`}>
            { ingredientState.name }
          </p>
          <div className={ styles.cost }>
            <p className={ `${styles.price} text text_type_digits-default`}>
              { `${ amount } x ${ price }` }
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      )
      
      return acc;
    }, [])

    return render;
  }

  return (
    <div className={styles.block}>
        <p className={ `${styles.order_number} text text_type_digits-default`}>
          { number }
        </p>
      <p className={`${styles.name} text text_type_main-medium`}>
        { name }
      </p>
      <p className={`${styles.status} text text_type_main-small`}>
        { status }
      </p>
      <div className={styles.order}>
      <p className='text text_type_main-medium'>
        Состав:
      </p>
      <div className={styles.ingredients}>
        { renderIngredients() }
      </div>
      </div>
      <div className={styles.timeCost}>
        <p className="text text_type_main-small text_color_inactive">
          { `${ day }, ${ time } ${ gmtText }` }
        </p>
        <div className={ styles.cost }>
          { getCost() }
        </div>
      </div>
    </div>
  )
}

export default OrderInfo;