import React,{ useEffect } from "react";

import "./cartPage.scss";
import { Routes, Route } from "react-router-dom";

import ListProduct from "./ListProduct";
import CheckoutAddress from "./CheckoutAddress";
import Payment from "./Payment";

function CartPage() {
  useEffect(() => {
    window.scrollTo(0,0)
  },[])

  return (
    <div className="cart-page">
      <Routes>
        <Route path="/cart" element={<ListProduct />}></Route>
        <Route path="/shipping" element={<CheckoutAddress />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
      </Routes>
    </div>
  );
}

export default CartPage;
