import React from 'react';
import { useDrop } from "react-dnd";
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BASE_URL, ENDPOINTS, TAB_VALUES } from '../../utils/constants';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { chosenIngredientsSlice } from '../../services/chosen-ingredients';
import { modalInfoSlice } from '../../services/modal-info';
import { modalVisibilitySlice } from '../../services/modal-visibility';
import ChosenIngredient from '../chosen-ingredients/chosen-ingredients';

function BurgerConstructor() {
  const { chosenIngredients } = useSelector(store => ({
    chosenIngredients: store.chosenIngredients,
  }), shallowEqual);
  const dispatch = useDispatch();
  const { add, removeAll } = chosenIngredientsSlice.actions;
  const { addModalInfo } = modalInfoSlice.actions;
  const { openModal } = modalVisibilitySlice.actions;
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(data) {
      addIngredient(data);
    },
  });

  const addIngredient = (element) => {
    const type = element.type === TAB_VALUES.bun ? element.type : TAB_VALUES.other;
    const id = element._id;
    const newChosenIngredients = JSON.parse(JSON.stringify(chosenIngredients));

    if (!newChosenIngredients[type]) {
      newChosenIngredients[type] = [];
      newChosenIngredients[type].push(element);
    } else {
      const el = newChosenIngredients[type].find((item) => item._id === id);

      if (el && type !== TAB_VALUES.bun) {
        newChosenIngredients[type].push(element);
      } else {
        if (type !== TAB_VALUES.bun) {
          newChosenIngredients[type].push(element);
        } else {
          newChosenIngredients[type] = [element];  
        }
      }
    }

    dispatch(add(newChosenIngredients));
  }

  const getElements = () => {
    const elements = [];
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
        { other.map((element, index) => <ChosenIngredient element={element} index={index} key={`${ element._id }${ index }`} />) }
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
    const [bun] = chosenIngredients[TAB_VALUES.bun];
    const sumBuns = bun.price * 2;
    const sumIngredients = (chosenIngredients[TAB_VALUES.other] || []).reduce((acc, ingredient) => acc + ingredient.price, 0);

    return sumBuns + sumIngredients;
  }

  const addInfoAndOpenModal = () => {
    const ids = [];
    for (const type in chosenIngredients) {
      chosenIngredients[type].forEach(el => {
        ids.push(el._id);
      })
    }

    fetch(`${ BASE_URL }${ ENDPOINTS.SET_ORDER }`, {
      body: JSON.stringify({ ingredients: ids }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка ${JSON.stringify(res)}`);
    })
    .then(data => {
      const info = {
        order: true,
        orderNumber: data.order.number,
      };

      dispatch(addModalInfo(info));
      dispatch(openModal());
      dispatch(removeAll());
    })
    .catch(console.error);

  }

  return (
    <section className={styles.section}>
      <div className={styles.order} ref={dropTarget}>
        { getElements() }
      </div>
      <div className={styles.count}>
        <div className={styles.sum}>
          <p className="text text_type_digits-medium">
            { getSum() }
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={addInfoAndOpenModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;