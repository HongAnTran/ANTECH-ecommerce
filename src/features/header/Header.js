import React,{ memo } from "react";
import "./header.scss";
import logo from "../../assets/image/antech.png";
import { useDispatch, useSelector } from "react-redux";
import modalSlice from "../modals/modalSlice";
import { Link } from "react-router-dom";
import { cartSelector, currentUserSelector } from "../../redux/selector";
import { Avatar, Menu, Dropdown, Button } from "antd";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { auth } from "../../firebase";
import currentUserSlice from "../modals/currentUserSlice";
import { useNavigate } from "react-router-dom";
import HeaderCart from "./HeaderCart";
import cartUserSlice from "../../redux/sliceCommon/cartUserSlice";

const url = "http://localhost:3000/";

function Header() {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { name,  photoURL, isSeller } = useSelector(currentUserSelector);
  const cart = useSelector(cartSelector)

  const handleLogin = () => {
    dispatch(modalSlice.actions.onModalChange());
  };
  const handleLogout = async () => {
    await auth.signOut();
    history("/");

    window.location.reload();
  };

  //  listen user change => set current user
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(currentUserSlice.actions.setCurrentUserRequired(user.uid));
        dispatch(cartUserSlice.actions.getCartUserRequest(user.uid));
      }
    })
  }, [dispatch]);

  const handlePageSell = () => {
    if (isSeller) {
      history("/seller/products/list/all");
    } else {
      history("/seller/register");
    }
  };

  return (
    <header
      className="header"
      style={
        window.location.href === url
          ? { position: "fixed" }
          : { position: "relative" }
      }
    >
      <div className="container">
        <div className="header-container">
          <div className=" header-logo">
            <Link to="/">
              <img src={logo} alt="" className="logo-brand" />
              <img
                className="logo-free"
                src="https://salt.tikicdn.com/ts/upload/e5/1d/22/61ff572362f08ead7f34ce410a4a6f96.png"
                alt=""
              />
            </Link>
          </div>
          <div className="header-search">
            <div className="header-search_main">
              <input
                type="text"
                placeholder="Search"
                className="header-search_input"
              />
              <button className="btn btn-primary btn-search">
                <SearchOutlined style={{ marginRight: 4 }} />
                <span>Tìm Kiếm</span>
              </button>
            </div>
          </div>
          <div className="header-account">
            <div className="header-account_avt">
              {name ? (
                <Avatar
                  style={{ marginRight: 8 }}
                  src={photoURL ? photoURL : ""}
                >
                  {name[0].toUpperCase()}
                </Avatar>
              ) : (
                <img
                  src="https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd910ba50954c702e.png"
                  alt=""
                  className="img-logo"
                />
              )}

              {name ? (
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="0">
                        <Link to="/customer/account/profile">Tài khoản của tôi</Link>
                      </Menu.Item>
                      <Menu.Item key="1">
                        <Link to="/customer/purchase/all">Đơn mua</Link>
                      </Menu.Item>
                      <Menu.Item key="2">
                        <span onClick={handlePageSell}>Trang bán hàng</span>
                      </Menu.Item>
                      <Menu.Item key="3">
                        <Button onClick={handleLogout}>Thoát tài khoản</Button>
                      </Menu.Item>
                      <Menu.Divider />
                    </Menu>
                  }
                >
                  <div className="header-account_name">
                    <div>
                      {name}
                      <CaretDownOutlined />
                    </div>
                  </div>
                </Dropdown>
              ) : (
                <div className="header-account_btn" onClick={handleLogin}>
                  <button className="btn-login">đăng nhập/đăng kí</button>
                  <div className="header-account_name">Tài Khoản</div>
                </div>
              )}
            </div>
          </div>
        <HeaderCart  carts={cart}/>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
