import { useCallback, useEffect, useState } from "react";
import styles from './form.module.css'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../services/actions/auth";
import { ENDPOINTS } from "../utils/constants";
import { errorStateSlice } from "../services/error-state";

function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', token: '' });
  const { refreshForm } = errorStateSlice.actions;

  if (!form.password) {
    dispatch(refreshForm());
  }

  useEffect(() => {
    dispatch(
      auth(
        ENDPOINTS.RESET_PASSWORD,
        'GET'
      )
    )
  }, [dispatch])

  const { errorState, userState } = useSelector(store => ({
    errorState: store.errorState,
    userState: store.userState,
  }), shallowEqual);

  const resetPasswordRequest = useCallback(
    e => {
      e.preventDefault();
      dispatch(
        auth(
          ENDPOINTS.RESET_PASSWORD,
          'POST',
          {
            "password": form.password,
            "token": form.token,
          }
        )
      )
      localStorage.removeItem('reset-password');

      navigate('/');
    },
    [dispatch, form, navigate]
  );

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isUserAllowedToChangePassword = localStorage.getItem('reset-password');

  if (userState.user) {
    return (
      <Navigate
        to={'/'}
      />
    );
  }

  if (!isUserAllowedToChangePassword) {
    return (
      <Navigate
        to={'/forgot-password'}
      />
    );
  }

  return (
    <div className={styles.main}>
      <form className={styles.form}>
        { userState.isLoading ? 
          <>
            <h1 className='text text_type_main-medium'>
              Отправляем...
            </h1>
            <span className={styles.loader}></span>
          </>
          :
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        }
        { !userState.isLoading &&
          <div className={styles.input}>
            <PasswordInput
              onChange={onChange}
              value={form.password}
              name={'password'}
              extraClass="mb-2"
              placeholder={'Введите новый пароль'}
            />
            <Input
              type={'confirm-code'}
              placeholder={'Введите код из письма'}
              onChange={onChange}
              value={form.token}
              name={'token'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
            <div className={styles.button}>
              <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={resetPasswordRequest}
              >
                Сохранить
              </Button>
            </div>
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
            Вспомнили пароль? 
          </p>
          <Link className={`text text_type_main-default ${styles.link}`} to='/login'>Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;