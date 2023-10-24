import { useCallback, useEffect } from "react";
import styles from './form.module.css'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../services/actions/auth";
import { ENDPOINTS } from "../utils/constants";
import { errorStateSlice } from "../services/error-state";
import { useForm } from "../utils/utils";

function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChange } = useForm({ email: '' });
  const { refreshForm } = errorStateSlice.actions;

  if (!values.email) {
    dispatch(refreshForm());
  }

  useEffect(() => {
    dispatch(
      auth(
        ENDPOINTS.USER_INFO,
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
          ENDPOINTS.RESET_PASSWORD_REQUEST,
          'POST',
          {
            "email": values.email,
          }
        )
      )
      localStorage.setItem('reset-password', true);

      navigate('/reset-password');
    },
    [dispatch, values, navigate]
  );

  if (userState.user) {
    return (
      <Navigate
        to={'/'}
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
            <Input
              type={'email'}
              placeholder={'Укажите E-mail'}
              onChange={handleChange}
              value={values.email}
              name={'email'}
              error={errorState.error}
              errorText={'Ошибка'}
              size={'default'}
            />
            <button className={styles.button}>
              <Button
                htmlType="button"
                type="primary"
                size="large"
              >
                Восстановить
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
            Вспомнили пароль? 
          </p>
          <Link className={`text text_type_main-default ${styles.link}`} to='/login'>Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;