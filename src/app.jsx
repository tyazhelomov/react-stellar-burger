import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRouteElement } from "./components/protected-route";
import AppHeader from "./components/header/header";
import IngredientDetails from './components/ingredient-details/ingredient-details';
import Modal from './components/modal/modal';
import { useDispatch } from 'react-redux';
import { getIngredients } from './services/actions/get-ingredients';
import { useCallback, useEffect } from 'react';
import { MODAL_HEADER, WS_ENDPOINTS } from './utils/constants';
import {
  HomePage,
  LoginPage,
  ForgotPasswordPage,
  IngredientPage,
  FeedPage,
  FeedInfoPage,
  ProfilePage,
  OrdersPage,
  OrderInfoPage,
  RegisterPage,
  ResetPasswordPage,
  NotFound404,
} from './pages';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModalFunc = useCallback(() => {
    navigate(location.state.from);
  }, [location, navigate]);

  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(
    () => {
      dispatch({ type: 'WS_ALL_CONNECTION_START', endpoint: WS_ENDPOINTS.ALL });
    },
    [dispatch]
  );

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} >
          <Route path="orders" element={<ProtectedRouteElement element={<OrdersPage />} />} >
            <Route path=":id" element={<ProtectedRouteElement element={<OrderInfoPage />} />} />
          </Route>
        </Route>
        <Route path="/feed" element={<FeedPage />} >
          <Route path=":id" element={<FeedInfoPage />} />
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      { background && (
        <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal onClose={closeModalFunc} title={ MODAL_HEADER.INGREDIENT_INFO }>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/orders/:id'
              element={
                <Modal onClose={closeModalFunc} title={ MODAL_HEADER.ORDER_INFO }>
                  <FeedPage />
                </Modal>
              }
            />
            <Route
              path='/feed/:id'
              element={
                <Modal onClose={closeModalFunc} title={ MODAL_HEADER.ORDER_INFO }>
                  <FeedPage />
                </Modal>
              }
            />
          </Routes>
        )}
    </>
  );
}

export default App;