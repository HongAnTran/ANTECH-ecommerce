import React from 'react'
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import LoginModal from './features/modals/login/LoginModal';
import RegisterModal from './features/modals/register/RegisterModal';
import "swiper/css/bundle";
import HomePage from './pages/homepage/HomePage'
import RegisterSellPage from './pages/registerSellerPage/ResgisterSellPageMain'
// import Footer from './components/footer/Footer';
import BusinessPage from './pages/sellerpage/BusinessPage';
import ErrorPage from './pages/errorPage/ErrorPage'
import ProductPage from './pages/productPage/ProductPage';
import CartPage from './pages/cartPage/CartPage';
import Header from './features/header/Header';
import NotificationCustom from './components/notification/NotificationCustom';
import CustomerPage from './pages/custumerPage/CustomerPage';
function App() {
  return (
    <div className="App">
  <Header />
    <Routes >
      <Route index path='/'element={ <HomePage /> }> </Route>

      <Route path='/seller/*'element={<BusinessPage /> }> </Route>
      <Route path='/seller/register'element={ <RegisterSellPage /> }> </Route>

      <Route path='/:productId'element={ <ProductPage /> }> </Route>
      <Route path='/checkout/*'element={ <CartPage /> }> </Route>
      <Route path='/customer/*' element={ <CustomerPage />}></Route>

      <Route path='*'element={ <ErrorPage /> }> </Route>  
    </Routes>

    <LoginModal />
    <RegisterModal />
    <NotificationCustom />
    </div>
  );
}

export default App;
