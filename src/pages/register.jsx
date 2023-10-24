import { useCallback, useEffect, useState } from "react";
import styles from './form.module.css'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { ENDPOINTS } from "../utils/constants";
import { auth } from "../services/actions/auth";
import { errorStateSlice } from "../services/error-state";

function RegisterPage() {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: '', password: '', name: '' });
  const { refreshForm } = errorStateSlice.actions;

  if (!form.email) {
    dispatch(refreshForm());
  }

  const registerUser = useCallback(
    e => {
      e.preventDefault();
      dispatch(
        auth(
          ENDPOINTS.REGISTER,
          'POST',
          {
            "email": form.email, 
            "password": form.password, 
            "name": form.name, 
          }
        )
      )
    },
    [dispatch, form]
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

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.main}>
      <form className={styles.form}>
        { userState.isLoading ? 
          <>
            <h1 className='text text_type_main-medium'>
              Заходим...
            </h1>
            <span className={styles.loader}></span>
          </>
          :
          <h1 className="text text_type_main-medium">Регистрация</h1>
        }
        { !userState.isLoading &&
          <div className={styles.input}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              value={form.name}
              name={'name'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={onChange}
              value={form.email}
              name={'email'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
            <PasswordInput
              type={'password'}
              onChange={onChange}
              value={form.password}
              name={'password'}
              extraClass="mb-2"
            />
            <div className={styles.button}>
              <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={registerUser}
              >
                Зарегистрироваться
              </Button>
            </div>
          </div>
        }
        { errorState.error && 
          <p className={`${ styles.error } text text_type_main-small`}>
            { errorState.errorMsg || 'Произошла ошибка' }
          </p>
        }
      </form>
      <div className={styles.links}>
        <div className={styles.text}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы? 
          </p>
          <Link className={`text text_type_main-default ${styles.link}`} to='/login'>Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;