import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRouteElement } from "./components/protected-route";
import AppHeader from "./components/header/header";
import IngredientDetails from './components/ingredient-details/ingredient-details';
import Modal from './components/modal/modal';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getIngredients } from './services/actions/get-ingredients';
import { useCallback, useEffect } from 'react';
import { MODAL_HEADER } from './utils/constants';
import {
  HomePage,
  LoginPage,
  ForgotPasswordPage,
  IngredientPage,
  FeedPage,
  ProfilePage,
  OrdersPage,
  OrderInfoPage,
  RegisterPage,
  ResetPasswordPage,
  NotFound404,
} from './pages';
import OrderLayout from './components/order-layout/order-layout';

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

  const { ingredients } = useSelector(store => ({
    ingredients: store.ingredients,
  }), shallowEqual);

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
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersPage />} />} />
        <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={<OrderInfoPage isUser={true} ingredients={ingredients} />} />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<OrderInfoPage ingredients={ingredients} />} />
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
              path='/profile/orders/:id'
              element={
                <Modal onClose={closeModalFunc} title={ MODAL_HEADER.ORDER_INFO }>
                  <OrderLayout ingredients={ingredients} />
                </Modal>
              }
            />
            <Route
              path='/feed/:id'
              element={
                <Modal onClose={closeModalFunc} title={ MODAL_HEADER.ORDER_INFO }>
                  <OrderLayout ingredients={ingredients} />
                </Modal>
              }
            />
          </Routes>
        )}
    </>
  );
}

export default App;