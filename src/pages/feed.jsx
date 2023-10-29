import { useCallback, useEffect, useState } from "react";
import styles from './profile.module.css'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { auth } from "../services/actions/auth";
import { ENDPOINTS } from "../utils/constants";
import { userStateSlice } from "../services/user-state";
import { useForm } from "../hooks/useForm";

function FeedPage() {
  const dispatch = useDispatch();
  const { logoutUser } = userStateSlice.actions;
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

  const { values, handleChange } = useForm({ name: userState.user.name, email: userState.user.email, password: '' });

  const updateUser = useCallback(
    e => {
      e.preventDefault();
      dispatch(
        auth(
          ENDPOINTS.USER_INFO,
          'PATCH',
          {
            "name": values.name,
            "email": values.email, 
            "password": values.password,
          }
        )
      )
    },
    [dispatch, values]
  );

  const [fields, setFields] = useState({ name: false, email: false });

  useEffect(() => {
    setFields({ name: false, email: false })
  }, [userState])

  const allowChanges = name => {
    setFields({ ...fields, [name]: !fields[name] });
  }

  const logout = useCallback(
    e => {
      e.preventDefault();
      dispatch(
        auth(
          ENDPOINTS.LOGOUT,
          'POST',
          {
            "token": localStorage.getItem('refreshToken')
          }
        )
      );
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(logoutUser())
    },
    [dispatch, logoutUser]
  );

  return (
    <div className={styles.main}>
      { userState.isLoading &&
        <div className={styles.loading}>
          <h1 className='text text_type_main-medium'>
            Получаем информацию...
          </h1>
          <span className={styles.loader}></span>
        </div>
      }
      { !userState.isLoading &&
      <>
          <div className={styles.links}>
            <NavLink
              to='/profile' end
              className={styles.link}
            >{({ isActive }) => (
              <p className={ 
                isActive
                ? `${styles.link} text text_type_main-medium text_color_primary`
                : `${styles.link} text text_type_main-medium text_color_inactive`}>Профиль</p>
            )}</NavLink>
            <NavLink
              to='/profile/orders' end
              className={styles.link}
            >{({ isActive }) => (
              <p className={ 
                isActive
                ? `${styles.link} text text_type_main-medium text_color_primary`
                : `${styles.link} text text_type_main-medium text_color_inactive`}>История заказов</p>
            )}</NavLink>
            <button className={`${styles.exit} text text_type_main-medium text_color_inactive`} onClick={logout}>
              Выход
            </button>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
          <form onSubmit={updateUser}>
            <div className={styles.input}>
              <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleChange}
                icon="EditIcon"
                value={values.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                onIconClick={() => allowChanges('name')}
                disabled={!fields['name']}
              />
              <Input
                type={'email'}
                placeholder={'E-mail'}
                onChange={handleChange}
                icon="EditIcon"
                value={values.email}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                onIconClick={() => allowChanges('email')}
                disabled={!fields['email']}
              />
              <PasswordInput
                type={'password'}
                onChange={handleChange}
                value={values.password}
                name={'password'}
                icon="EditIcon"
              />
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                extraClass={ styles.button }
              >
                Сохранить
              </Button>
            </div>
          </form>
        </>
      }
      { errorState.error && 
        <p className={`${ styles.error } text text_type_main-small`}>
          { errorState.errorMsg }
        </p>
      }
    </div>
  );
}

export default FeedPage;