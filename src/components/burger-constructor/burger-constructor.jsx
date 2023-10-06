import React from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { TAB_VALUES } from '../app/app';
import { IsVisibleModalContext, ModalInfoContext, ChosenIngredientsContext } from '../../services/appContext';

const URL = 'https://norma.nomoreparties.space/api/orders';

function BurgerConstructor() {
  const { isVisibleModalDispatcher } = React.useContext(IsVisibleModalContext);
  const { modalInfoDispatcher } = React.useContext(ModalInfoContext);
  const { chosenIngredients, chosenIngredientsDispatcher } = React.useContext(ChosenIngredientsContext);

  const removeIngredient = (ingredient) => {
    const id = ingredient._id;
    const addedIngredients = { ...chosenIngredients };
    const index = addedIngredients[TAB_VALUES.other].findIndex((item) => item._id === id);
    addedIngredients[TAB_VALUES.other].splice(index, 1);

    chosenIngredientsDispatcher({
      type: 'remove',
      data: addedIngredients,
    });
  }

  const removeAllIngredients = () => {
    chosenIngredientsDispatcher({
      type: 'removeAll',
    });
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
        { other.map((element) => 
          <div className={styles.element} key={element._id}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={element.name}
              price={element.price * element.count}
              thumbnail={element.image}
              handleClose={() => removeIngredient(element)}
            />
          </div>
        ) }
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
    const sumIngredients = (chosenIngredients[TAB_VALUES.other] || []).reduce((acc, ingredient) => acc + ingredient.price * ingredient.count, 0);

    return sumBuns + sumIngredients;
  }

  const addInfoAndOpenModal = () => {
    const ids = [];
    for (const type in chosenIngredients) {
      chosenIngredients[type].forEach(el => {
        ids.push(el._id);
      })
    }

    fetch(URL, {
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
      }

      modalInfoDispatcher({ type: 'add', data: info });
      isVisibleModalDispatcher({ type: 'open' });
      removeAllIngredients();
    })
    .catch(console.error);

  }

  return (
    <section className={styles.section}>
      <div className={styles.order}>
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