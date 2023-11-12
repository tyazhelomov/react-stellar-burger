import { shallowEqual } from 'react-redux';
import { MONTHS_MAP, STATUS_MAP, TAB_VALUES } from '../../utils/constants';
import styles from './order-item.module.css';
import moment from 'moment';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { IOrder } from '../../services/types/socket';
import { useAppSelector } from '../../hooks/hooks';

interface IOrderItem {
  element: IOrder;
  isProfile: Boolean
}

type TMap = {
  [name: string]: number;
};

const OrderItem: FC<IOrderItem> = ({ element, isProfile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ingredients } = useAppSelector(store => ({
    ingredients: store.ingredients,
  }), shallowEqual);
  const allIngredients = [...ingredients[TAB_VALUES.bun], ...ingredients[TAB_VALUES.main], ...ingredients[TAB_VALUES.sauce]];

  const renderImages = () => {
    const ingredients = [...element.ingredients].reverse();
    const accConfigureMap: TMap = {};

    const configureMap = ingredients.reduce((acc, el) => {
      if (!acc[el]) {
        acc[el] = 1;
      } else {
        acc[el] += 1;
      }

      return acc;
    }, accConfigureMap);

    // Понимаю что с асимптотикой беда, но на скорую руку что сообразил)

    const acc: Array<JSX.Element> = [];
    const ingredientsMap: TMap = {};
    const render = ingredients.reduce((acc, el) => {
      const ingredientState = allIngredients.find(ingredient => ingredient._id === el);
      if (ingredientState) {
        if (!ingredientsMap[el]) {
          ingredientsMap[el] = 1;
        } else {
          ingredientsMap[el] += 1;
        }
  
        if (ingredientsMap[el] > 1) {
          return acc;
        }
  
        const total = Object.keys(ingredientsMap).length;
        const totalIngredients = Object.keys(configureMap).length;
  
        if (ingredientState.type === TAB_VALUES.bun || (total > 1 && total < 6)) {
          acc.push(
            <div className={ styles.pic } key={`${element.number}${el}`}>
              <div className={styles.border}>
                <img className={styles.image} src={ ingredientState.image_mobile } alt={ ingredientState.name } />
              </div>
            </div>
          )
        } else if (total === 1) {
          acc.push(
            <div className={ styles.pic } key={`${element.number}${el}`}>
              <div className={styles.border}>
                {
                  totalIngredients - 6 > 0 && <p className={ `${ styles.lastPicText } text text_type_digits-default` }>
                    { `+${ totalIngredients - 6 }` }
                  </p>
                }
                <img className={styles.image} src={ ingredientState.image_mobile } alt={ ingredientState.name } />
              </div>
            </div>
          )
        }
      }

      return acc;
    }, acc)

    return render;
  }

  const getCost = () => {
    const ingredients = element.ingredients;
    const cost = ingredients.reduce((acc, el) => {
      const ingredientState = allIngredients.find(ingredient => ingredient._id === el);

      if (ingredientState) {
        if (ingredientState.type === TAB_VALUES.bun) {
          acc += ingredientState.price * 2;
        } else {
          acc += ingredientState.price;
        }
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

  const name = element.name;
  const number = `#${ element.number }`;
  const dateOfOrder = moment(element.updatedAt).date();
  const monthOfOrder = moment(element.updatedAt).month() + 1;
  const dayToday = moment().date();
  const monthToday = moment().month() + 1;
  const dayYesterday = moment().add(-1, 'd').date();
  const monthYesterday = moment().add(-1, 'd').month() + 1;

  const day =
    dateOfOrder === dayToday && monthOfOrder === monthToday ? 'Сегодня'
    : dateOfOrder === dayYesterday && monthOfOrder === monthYesterday ? 'Вчера'
    : `${ dateOfOrder } ${ MONTHS_MAP[monthOfOrder] }`;

  const time = moment(element.updatedAt).format('HH:mm');
  const gmt = moment(element.updatedAt).utcOffset() / 60;
  const gmtText = `i-GMT${ gmt >= 0 ? `+${ gmt }` : `-${ gmt }` }`;

  const status = STATUS_MAP[element.status];

  const path: string = isProfile ? '/profile/orders' : '/feed';

  const openOrderInfo = () => {
    navigate(`${ path }/${ element.number }`, { state: { background: location, element, from: location }})
  }

  return (
    <div className={ styles.block } onClick={(e) => openOrderInfo()} >
      <div className={ styles.element }>
        <div className={ styles.top }>
          <p className="text text_type_digits-default">
            { number }
          </p>
          <p className="text text_type_main-small text_color_inactive">
            { `${ day }, ${ time } ${ gmtText }` }
          </p>
        </div>
        <div className={ styles.name }>
          <p className="text text_type_main-medium">
            { name }
          </p>
        </div>
        { isProfile && (
          <div className={ styles.status }>
          <p className="text text_type_main-small">
            { status }
          </p>
          </div>
        )}
        <div className={ styles.ingredients }>
          <div className={ styles.pictures }>
            { renderImages() }
          </div>
          <div className={ styles.cost }>
            { getCost() }
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;