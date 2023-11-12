import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { TAB_VALUES } from '../../utils/constants';
import { shallowEqual } from 'react-redux';
import { chosenIngredientsSlice } from '../../services/chosen-ingredients';
import ChosenIngredient from '../chosen-ingredients/chosen-ingredients';
import { setOrder } from '../../services/actions/set-order';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { FC } from "react";
import { IIngredientInfo, IIngredients } from "../../services/types/ingredient";

const BurgerConstructor: FC = () => {
  const { chosenIngredients } = useAppSelector(store => ({
    chosenIngredients: store.chosenIngredients,
  }), shallowEqual);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { add } = chosenIngredientsSlice.actions;
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(data: IIngredientInfo) {
      data = JSON.parse(JSON.stringify(data));
      data.uuid = uuidv4();

      addIngredient(data);
    },
  });

  const addIngredient = (element: IIngredientInfo) => {
    const type = element.type === TAB_VALUES.bun ? element.type : TAB_VALUES.other;
    const newChosenIngredients: IIngredients = JSON.parse(JSON.stringify(chosenIngredients));

    if (!newChosenIngredients[TAB_VALUES.bun] && element.type !== TAB_VALUES.bun) {
      return;
    }

    if (!newChosenIngredients[type]) {
      newChosenIngredients[type] = [];
      newChosenIngredients[type].push(element);
    } else if (type !== TAB_VALUES.bun) {
        newChosenIngredients[type].push(element);
    } else {
      newChosenIngredients[type] = [element];  
    }

    dispatch(add(newChosenIngredients));
  }

  const getElements = () => {
    const elements: Array<JSX.Element> = [];
    const [bun] = chosenIngredients[TAB_VALUES.bun];
    const other = chosenIngredients[TAB_VALUES.other] || [];
    elements.push(
      <div className={styles.locked} key={`${bun._id}_up`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${ bun.name } (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    )
    elements.push(
      <div className={styles.burger} key={'ingredients'}>
        { other.map((element, index) => <ChosenIngredient element={element} index={index} key={element.uuid} />) }
      </div>
    )
    elements.push(
      <div className={styles.locked} key={`${bun._id}_down`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${ bun.name } (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    )

    return elements;
  }

  const getSum = () => {
    const [bun] = chosenIngredients[TAB_VALUES.bun] || [];
    const sumBuns = bun?.price * 2 || 0;
    const sumIngredients = (chosenIngredients[TAB_VALUES.other] || []).reduce((acc, ingredient) => acc + ingredient.price, 0);

    return sumBuns + sumIngredients;
  }

  const addInfoAndOpenModal = () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      navigate('/login');

      return;
    }

    const ids: Array<string> = [];
    for (const type in chosenIngredients) {
      chosenIngredients[type].forEach(el => {
        ids.push(el._id);
      })
    }

    dispatch(setOrder(ids));
  }

  return (
    <section className={styles.section}>
      <div className={styles.order} ref={dropTarget}>
        { chosenIngredients[TAB_VALUES.bun] && getElements() } 
        { !chosenIngredients[TAB_VALUES.bun] && 
          <h1 className="text text_type_main-medium">
            Перетащите булку для начала заказа
          </h1> 
        }
      </div>
      <div className={styles.count}>
        <div className={styles.sum}>
          <p className="text text_type_digits-medium">
            { getSum() }
          </p>
          <CurrencyIcon type="primary" />
        </div>
        { 
          chosenIngredients[TAB_VALUES.bun] && 
          <Button htmlType="button" type="primary" size="large" onClick={addInfoAndOpenModal}>
            Оформить заказ
          </Button>
        }
      </div>
    </section>
  )
}

export default BurgerConstructor;