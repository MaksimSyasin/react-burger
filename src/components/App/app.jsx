import React, {useState, useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import { Routes, Route,} from 'react-router';
import Main from '../../pages/main/main';
import { ProtectedRouteElement } from '../ProtectedRoute';
import Register from '../../pages/register/register';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import IngredientPage from '../../pages/ingredient-page/ingredient-page';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { isErrorAction } from '../../services/actions/auth';
import { getUserAsync } from '../../services/asyncActions/auth';
import { getIngredients } from '../../services/actions/ingredients';
import Preloader from '../Preloader/Preloader';


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['stellarBurger']);

  let isAuth = useSelector(store => store.authReducer.isUserAuth);
  const isLoading = useSelector(store => store.authReducer.isLoading);
  const accessTokenSelector = useSelector(store => store.authReducer.accessToken);
  const refreshTokenSelector = useSelector(store => store.authReducer.refreshToken);

  const dispatch = useDispatch();


  const [isUserForgotPassword, setIsUserForgotPassword] = useState(false);


  useEffect(() => {
    if (cookies.accessToken === 'undefined') {
      dispatch(isErrorAction('user is not authorized'))
    } else {
      dispatch(getUserAsync(cookies.accessToken, cookies.refreshToken))
      
    }

    if (cookies.isUserVisited) {
      setIsUserForgotPassword(true)
    }
  }, [])

  useEffect(() => {
    if (accessTokenSelector !== null && accessTokenSelector) {
      setCookie("accessToken", accessTokenSelector)
    } if (refreshTokenSelector) {
      setCookie("refreshToken", refreshTokenSelector)
    }
  }, [isAuth])


  useEffect(()=> {
    dispatch(getIngredients())
}, [dispatch])

  return (
    <>
      <AppHeader />
      {isLoading ?
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<ProtectedRouteElement element={<Register />} isAuth={isAuth} routeWithAuthrized={false} replaceRoute='/' />} />
          <Route path="/login" element={<ProtectedRouteElement element={<Login />} isAuth={isAuth} routeWithAuthrized={false} replaceRoute='/' />} />
          <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPassword isVisited={setIsUserForgotPassword}/>} isAuth={isAuth} routeWithAuthrized={false} replaceRoute='/' />} />
          
          {isUserForgotPassword &&
            <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPassword />} isAuth={isAuth} routeWithAuthrized={false} replaceRoute='/' />} />
          }
          <Route path="/profile" element={<ProtectedRouteElement element={<Profile />} isAuth={isAuth} routeWithAuthrized={true} replaceRoute='/login' />} />
          <Route path='/ingredients/:ingredientId' element={<IngredientPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        : <Preloader />
      }
    </>
  );
}

export default App;


