import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { BurgerIcon, Button, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";

const AppHeader: FC = () => {
  const navigate = useNavigate();

  const moveToHomePage = () => {
    navigate('/');
  }
  
  const moveToOrders = () => {
    navigate('/feed');
  }
  
  const moveToProfile = () => {
    navigate('/profile');
  }

  return (
    <header className={styles.header}>
      <nav className={styles.toolBar}>
        <div className={styles.navigation}>
          <Button htmlType="button" type="secondary" size="small" onClick={moveToHomePage}>
            <div className={styles.button}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-small">
                Конструктор
              </p>
            </div>
          </Button>
          <Button htmlType="button" type="secondary" size="small" onClick={moveToOrders}>
            <div className={styles.button}>
              <ListIcon type="primary"/>
              <p className="text text_type_main-small">
                Лента заказов
              </p>
            </div>
          </Button>
        </div>
        <button className={styles.button} onClick={moveToHomePage}>
          <Logo />
        </button>
        <div className={styles.profile}>
          <Button htmlType="button" type="secondary" size="small" onClick={moveToProfile}>
            <div className={styles.button}>
              <ProfileIcon type="primary"/>
              <p className="text text_type_main-small">
                Личный кабинет
              </p>
            </div>
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default AppHeader;