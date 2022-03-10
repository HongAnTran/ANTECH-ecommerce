import React from "react";
import "./sellerpage.scss";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  FileDoneOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Link, Route, Routes } from "react-router-dom";
import ProductsSeller from "./productsSeller/ProductsSeller";
import OrderSeller from "./ordersSeller/OrderSeller";
const { SubMenu } = Menu;
function BusinessPage() {
  return (
    <div className="seller-page">
      <div className="row  gx-0">
        <div className="col-xl-3 col-lg-3 col-sm-3 col-md-3">
          <Menu
            mode="inline"
            defaultOpenKeys={["sub1", "sub2", "sub3"]}
            defaultSelectedKeys={["1"]}
            style={{ width: 256 }}
          >
            <SubMenu
              key="sub1"
              icon={<AppstoreOutlined />}
              title="Quản lí sản phẩm"
            >
              <Menu.Item key="1">
                <Link to="/seller/products/list/all">Tất cả sản phẩm</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/seller/products/category">Thêm sản phẩm</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              icon={<FileDoneOutlined />}
              title="Quản lí đơn hàng"
            >
              <Menu.Item key="3">
                {" "}
                <Link to="/seller/orders/all">Tất cả</Link>
              </Menu.Item>
              <Menu.Item key="4">Đơn hủy</Menu.Item>
              <Menu.Item key="5">Trả hoàn tiền</Menu.Item>
            </SubMenu>

            <SubMenu key="sub3" icon={<BankOutlined />} title="Tài chính">
              <Menu.Item key="6">Doanh thu</Menu.Item>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-xl-8  col-lg-8 col-sm-8 col-md-8">
          <div className="container">
            <div className="seller-homepage_main">
              <Routes>
                <Route path="/products/*" element={<ProductsSeller />}>  </Route>
                <Route path="/orders/*" element={<OrderSeller />}>  </Route>

              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessPage;
