import { useCallback, useEffect } from "react";
import styles from './form.module.css'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../services/actions/auth";
import { ENDPOINTS } from "../utils/constants";
import { errorStateSlice } from "../services/error-state";
import { useForm } from "../utils/utils";

function LoginPage() {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({ email: '', password: '' });
  const { refreshForm } = errorStateSlice.actions;

  if (!values.email) {
    dispatch(refreshForm());
  }

  const loginUser = useCallback(
    e => {
      e.preventDefault();
      dispatch(
        auth(
          ENDPOINTS.LOGIN,
          'POST',
          {
            "email": values.email, 
            "password": values.password,
          }
        )
      )
    },
    [dispatch, values]
  );

  const { userState, errorState } = useSelector(store => ({
    userState: store.userState,
    errorState: store.errorState,
  }), shallowEqual);

  useEffect(() => {
    dispatch(
      auth(
        ENDPOINTS.USER_INFO,
        'GET'
      )
    )
  }, [dispatch])

  if (userState.user) {
    return (
      <Navigate
        to={'/'}
      />
    );
  }

  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={loginUser}>
        { userState.isLoading ? 
          <>
            <h1 className='text text_type_main-medium'>
              Заходим...
            </h1>
            <span className={styles.loader}></span>
          </>
          :
          <h1 className="text text_type_main-medium">Вход</h1>
        }
        { !userState.isLoading &&
          <div className={styles.input}>
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={handleChange}
              icon={'CurrencyIcon'}
              value={values.email}
              name={'email'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
            <PasswordInput
              onChange={handleChange}
              value={values.password}
              name={'password'}
              extraClass="mb-2"
            />
            <button className={ styles.button }>
              <Button
                htmlType="button"
                type="primary"
                size="large"
              >
                Войти
              </Button>
            </button>
          </div>
        }
        { errorState.error && 
          <p className={`${ styles.error } text text_type_main-small`}>
            { errorState.errorMsg }
          </p>
        }
      </form>
      <div className={styles.links}>
        <div className={styles.text}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь? 
          </p>
          <Link className={`text text_type_main-default ${styles.link}`} to='/register'>Зарегистрироваться</Link>
        </div>
        <div className={styles.text}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль? 
          </p>
          <Link className={`text text_type_main-default ${styles.link}`} to='/forgot-password'>Восстановить пароль</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;