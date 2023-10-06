import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { TAB_VALUES } from '../app/app';
import { funcPropType, ingredientsObjectPropType } from "../../utils/prop-types";

function BurgerConstructor({ chosenIngredients, removeIngredient, removeAllIngredients, openModal }) {
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
    const info = {
      order: true,
    }

    openModal(info);
    removeAllIngredients();
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

BurgerConstructor.propTypes = {
  chosenIngredients: ingredientsObjectPropType,
  removeIngredient: funcPropType,
  removeAllIngredients: funcPropType,
  openModal: funcPropType,
}; 