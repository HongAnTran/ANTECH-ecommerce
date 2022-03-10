import React, { useEffect, useState } from "react";
import { Route, Routes, Link, NavLink, useParams } from "react-router-dom";
import CustomerProfile from "./profile/CustomerProfile";
import CustomerPurchase from "./purchase/CustomerPurchase";
import "./customerPage.scss";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux"
import { currentUserSelector } from "../../redux/selector";
import Avatar from "antd/lib/avatar/avatar";


function CustomerPage() {
  const params = useParams();
  const [keyActive, setKeyActive] = useState();
  const user = useSelector(currentUserSelector)

  const handleActiveDrop = (isActive) => {
    return "dropdown-link" + (isActive.isActive ? " _3SzYTH" : " _gha2");
  };

  const handleMenu = (key) => {
    setKeyActive(key);
  };

  useEffect(() => {
    const param = params["*"];

    if (param.includes("account")) {
      setKeyActive(0);
    } else if (param.includes("purchase")) {
      setKeyActive(1);
    } else if (param.includes("notifications")) {
      setKeyActive(2);
    }
  }, [params]);

  return (
    <div className="customer-page">
      <div className="container">
        <div className="row">
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2">
            <div className="customer-nav">
              <div className="customer-nav_header">
                <div className="customer-nav_avt">
                  {user.photoURL ?    <img
                    src={user.photoURL}         
                    alt=""
                  ></img>  : <Avatar size="large" >{user.name.charAt(0).toUpperCase()}</Avatar>}
                
                  
                </div>
                <div className="customer-nav_info">
                  <div className="customer-nav_name">
                    <span>{user.name}</span>
                  </div>
                  <div className="customer-nav_edit">
                    <Link to="/customer/account/profile">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginRight: 4 }}
                      >
                        <path
                          d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                          fill="#9B9B9B"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                      <span>Sửa hồ sơ</span>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="customer-nav_menu">
                <div className="customer-nav_item">
                  <div
                    className="dropdown-header"
                    onClick={() => handleMenu(0)}
                  >
                    <Link
                      to="/customer/account/profile"
                      className="dropdown-link"
                    >
                      <div className="dropdown-icon">
                        <img
                          src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4"
                          alt=""
                        />
                      </div>
                      <div>
                        <span>Tài Khoản Của Tôi</span>
                      </div>
                    </Link>
                  </div>
                  <div
                    className={`dropdown-body ${
                      keyActive === 0  ? "stardust-dropdown__item-body--open" : ''
                    }`}
                  >
                    <div className="dropdown-body_list">
                      <NavLink
                        to="/customer/account/profile"
                        className={handleActiveDrop}
                      >
                        <span>Hồ Sơ</span>
                      </NavLink>
                      <NavLink
                        to="/customer/account/payment"
                        className={handleActiveDrop}
                      >
                        <span>Ngân Hàng</span>
                      </NavLink>
                      <NavLink
                        to="/customer/account/address"
                        className={handleActiveDrop}
                      >
                        <span>Địa Chỉ</span>
                      </NavLink>
                      <NavLink
                        to="/customer/account/password"
                        className={handleActiveDrop}
                      >
                        <span>Đổi Mật khẩu</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="customer-nav_item">
                  <div
                    className="dropdown-header"
                    onClick={() => handleMenu(1)}
                  >
                    <NavLink
                      to="/customer/purchase/all"
                      className={handleActiveDrop}
                    >
                      <div className="dropdown-icon">
                        <img
                          src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"
                          alt=""
                        />
                      </div>
                      <div>
                        <span
                          className={` ${keyActive !== 1 ? "linkBlack" : ""}`}
                        >
                          Đơn mua
                        </span>
                      </div>
                    </NavLink>
                  </div>
                </div>
                <div className="customer-nav_item">
                  <div
                    className="dropdown-header"
                    onClick={() => handleMenu(2)}
                  >
                    <Link
                      to="/customer/notifications/order"
                      className="dropdown-link"
                    >
                      <div className="dropdown-icon">
                        <img
                          src="https://cf.shopee.vn/file/e10a43b53ec8605f4829da5618e0717c"
                          alt=""
                        />
                      </div>
                      <div>
                        <span>Thông báo</span>
                      </div>
                    </Link>
                  </div>
                  <div
                    className={`dropdown-body ${
                      keyActive ===  2 ?  "stardust-dropdown__item-body--open" : ''
                    }`}
                  >
                    <div className="dropdown-body_list ">
                      <NavLink
                        to="/customer/notifications/order"
                        className={handleActiveDrop}
                      >
                        <span>Cập Nhật Đơn Hàng</span>
                      </NavLink>
                      <NavLink
                        to="/customer/notifications/discount"
                        className={handleActiveDrop}
                      >
                        <span>Khuyến Mãi</span>
                      </NavLink>
                      <NavLink
                        to="/customer/notifications/active"
                        className={handleActiveDrop}
                      >
                        <span>Hoạt Động</span>
                      </NavLink>
                      <NavLink
                        to="/customer/notifications/rater"
                        className={handleActiveDrop}
                      >
                        <span>Cập Nhật Đánh Giá</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="col-xl-10 col-lg-10 col-md-10 col-sm-">
            <Routes>
              <Route
                index
                path="/account/*"
                element={<CustomerProfile />}
              ></Route>
              <Route path="/purchase/*" element={<CustomerPurchase />}></Route>
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CustomerPage;
