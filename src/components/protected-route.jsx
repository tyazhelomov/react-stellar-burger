
import { Navigate, useLocation } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from '../services/actions/auth';
import { ENDPOINTS } from '../utils/constants';

export const ProtectedRouteElement = ({ element }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(
      auth(
        ENDPOINTS.USER_INFO,
        'GET'
      )
    )
  }, [dispatch])

  const { userState } = useSelector(store => ({
    userState: store.userState,
  }), shallowEqual);

  if (!userState.user) {
    return <Navigate to="/login" state={{ from: location }}/>;
  }

  return element;
}