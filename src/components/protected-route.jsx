
import { Navigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from '../services/actions/auth';
import { ENDPOINTS } from '../utils/constants';

export const ProtectedRouteElement = ({ element }) => {
  const dispatch = useDispatch();

  const { userState } = useSelector(store => ({
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

  return userState.user ? element : <Navigate to="/login" replace/>;
}