import styles from './form.module.css'
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

function NotFound404() {
  const navigate = useNavigate();

  const returnUser = () => {
    navigate(-1);
  }

  return (
    <div className={styles.main}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium">Страница не найдена</h1>
        <div className={styles.input}>
          <div className={styles.button}>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={returnUser}
            >
              Назад
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NotFound404;