import React,{ useEffect } from "react";
import OrdersAll from "./OrdersAll";
import "./ordersSeller.scss";
import { useParams , NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import orderSlice from "../../../redux/sliceCommon/orderSlice";
import { currentUserSelector ,orderSelector } from "../../../redux/selector";


function OrderSeller() {
  const params = useParams();
  const param = params['*']
  const dispatch = useDispatch();
  const { uid } = useSelector(currentUserSelector);
  const { order } =  useSelector(orderSelector);

  const handleActiveTabs = (isActive) => {
    return "purchase-tabs_item" + (isActive.isActive ? " _23VQQX " : "");
  };

  useEffect(() => {
    
    if (uid) {
      dispatch(orderSlice.actions.getOrderRequest({ seller: uid, type: param }));
    }
  }, [param, uid, dispatch]);

  return (
    <div className="orderSeller">
      <div className="orderSeller-header">
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
      </div>
      <div>
        <OrdersAll order={order} />
      </div>
    </div>
  );
}

export default OrderSeller;
