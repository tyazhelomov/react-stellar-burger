import { FC, useCallback } from "react";
import styles from './form.module.css'
import { shallowEqual } from "react-redux";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../services/actions/auth";
import { ENDPOINTS } from "../utils/constants";
import { errorStateSlice } from "../services/error-state";
import { useForm } from "../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const ForgotPasswordPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, handleChange } = useForm({ password: '', token: '' });
  const { refreshForm } = errorStateSlice.actions;

  if (!values.password) {
    dispatch(refreshForm());
  }

  const { errorState, userState } = useAppSelector(store => ({
    errorState: store.errorState,
    userState: store.userState,
  }), shallowEqual);

  const resetPasswordRequest = useCallback(
    () => {
      dispatch(
        auth(
          ENDPOINTS.RESET_PASSWORD,
          'POST',
          {
            "password": values.password,
            "token": values.token,
          }
        )
      )
      localStorage.removeItem('reset-password');

      navigate('/');
    },
    [dispatch, values, navigate]
  );
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
      <form className={styles.form} onSubmit={resetPasswordRequest}>
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
              onChange={handleChange}
              value={values.password}
              name={'password'}
              extraClass="mb-2"
              placeholder={'Введите новый пароль'}
            />
            <Input
              placeholder={'Введите код из письма'}
              onChange={handleChange}
              value={values.token}
              name={'token'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                onClick={resetPasswordRequest}
                extraClass={ styles.button }
              >
                Сохранить
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
            Вспомнили пароль? 
          </p>
          <Link className={`text text_type_main-default ${styles.link}`} to='/login'>Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;