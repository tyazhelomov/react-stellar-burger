import styles from './form.module.css'
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from 'react';
import { useNavigate } from "react-router-dom";

const NotFound404: FC = () => {
  const navigate = useNavigate();

  const returnUser = () => {
    navigate(-1);
  }

  return (
    <div className={styles.main}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium">Страница не найдена</h1>
        <div className={styles.input}>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={returnUser}
            extraClass={ styles.button }
          >
            Назад
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NotFound404;