
import { Navigate, useLocation } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { FC, useEffect } from 'react';
import { auth } from '../services/actions/auth';
import { ENDPOINTS } from '../utils/constants';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

interface IProtectedRouteElement {
  element: JSX.Element;
}

export const ProtectedRouteElement: FC<IProtectedRouteElement> = ({ element }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { userState } = useAppSelector(store => ({
    userState: store.userState,
  }), shallowEqual);

  useEffect(() => {
    dispatch(
      auth(
        ENDPOINTS.USER_INFO,
        'GET'
      )
    )
  }, [dispatch])

  if (!userState.user) {
    return <Navigate to="/login" state={{ from: location }}/>;
  }

  return element;
}