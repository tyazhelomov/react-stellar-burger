import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage, LoginPage, ForgotPasswordPage, IngredientPage, ProfilePage, RegisterPage, ResetPasswordPage, NotFound404 } from './pages';
import { ProtectedRouteElement } from "./components/protected-route";
import AppHeader from "./components/header/header";
import IngredientDetails from './components/ingredient-details/ingredient-details';
import Modal from './components/modal/modal';
import { useDispatch } from 'react-redux';
import { getIngredients } from './services/actions/get-ingredients';
import { useCallback, useEffect } from 'react';
import { modalInfoSlice } from './services/modal-info';
import { modalVisibilitySlice } from './services/modal-visibility';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { removeModalInfo } = modalInfoSlice.actions;
  const { closeModal } = modalVisibilitySlice.actions;

  const closeModalFunc = useCallback((modalInfoLocalStorage) => {
    dispatch(removeModalInfo());
    dispatch(closeModal());

    if (modalInfoLocalStorage) {
      localStorage.removeItem('modal-info');
      navigate('/')
    }
  }, [closeModal, dispatch, navigate, removeModalInfo]);

  const background = location.state && location.state.background;
  const modalInfoLocalStorage = JSON.parse(localStorage.getItem('modal-info'));

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
 
  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      { background && modalInfoLocalStorage && (
        <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal onClose={closeModalFunc}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
    </>
  );
}

export default App;