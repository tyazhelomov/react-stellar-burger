import { useCallback, useEffect } from "react";
import styles from './form.module.css'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from "react-router-dom";
import { auth } from "../services/actions/auth";
import { ENDPOINTS } from "../utils/constants";
import { errorStateSlice } from "../services/error-state";
import { useForm } from "../hooks/useForm";

function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();
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

  const redirectUrl = location.state?.from || '/';

  console.log(redirectUrl)

  if (userState.user) {
    return (
      <Navigate
        to={ redirectUrl }
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
            <Button
              type="primary"
              size="large"
              extraClass={ styles.button }
            >
              Войти
            </Button>
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