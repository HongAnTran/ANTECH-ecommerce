import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./purchase.scss";
import PurchaseItem from "./PurchaseItem";
import { useDispatch, useSelector } from "react-redux";
import orderSlice from "../../../redux/sliceCommon/orderSlice";
import { currentUserSelector, orderSelector } from "../../../redux/selector";
import NoneOrder from "./NoneOrder";

function CustomerPurchase() {
  const params = useParams();
  const param = params["*"];
  const dispatch = useDispatch();
  const { uid } = useSelector(currentUserSelector);
  const { order,isCreated , isLoadingOrder } = useSelector(orderSelector);
  console.log(order);
  const handleActiveTabs = (isActive) => {
    return "purchase-tabs_item" + (isActive.isActive ? " _23VQQX " : "");
  };
  
  useEffect(() => {
    if (uid && isCreated) {

      dispatch(orderSlice.actions.getOrderRequest({ uid, type: param }));
    }
  }, [param, uid, dispatch,isCreated]);

  return (
    <div className="purchase">
      <div className="purchase-tabs">
        <NavLink className={handleActiveTabs} to="./all">
          Tất cả
        </NavLink>
        <NavLink className={handleActiveTabs} to="./confirm">
          Chờ xác nhận 
        </NavLink>
        <NavLink className={handleActiveTabs} to="./deliver">
          Đang giao 
        </NavLink>
        <NavLink className={handleActiveTabs} to="./complete">
          Đã giao
        </NavLink>
        <NavLink className={handleActiveTabs} to="./cancel">
          Đã hủy
        </NavLink>
      </div>

    {order.length === 0 ? <NoneOrder /> :  <div className="purchase-router">
      {order.map(item =>   <PurchaseItem order={item} key={item._id}/>)}
      
      </div>}
     
    </div>
  );
}

export default CustomerPurchase;
