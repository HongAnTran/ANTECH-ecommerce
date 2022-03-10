import React, { useEffect } from "react";
import "./productsAll.scss";
import { Button, Tabs } from "antd";
import {
  PlusOutlined,
  CaretUpFilled,
  CaretDownFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../../api/api";
import {
  currentUserSelector,
  productsUserSelector,
} from "../../../redux/selector";
import productsUserSlice from "../../../redux/sliceCommon/productsUserSlice";

const { TabPane } = Tabs;
function ProductsAll() {
  const { uid } = useSelector(currentUserSelector);

  const dispatch = useDispatch();
  const products = useSelector(productsUserSelector);

  useEffect(() => {
    dispatch(productsUserSlice.actions.getAllProductsUserRequest(uid));
  }, [dispatch, uid]);

  const handlerDeleteProduct = async (Id, path) => {
    try {
      await api.deleteImages(path);

      dispatch(productsUserSlice.actions.deleteProductRequest(Id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="products-all">
      <div className="products-all_header">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tất cả" key="1"></TabPane>
          <TabPane tab="Đang hoạt động" key="2"></TabPane>
          <TabPane tab="Hết hàng" key="3"></TabPane>
        </Tabs>
      </div>
      <div className="products-all_parameter">
        <div className="products-all_info">
          <h3>{products.length} Product</h3>
          <span>có thể đăng tải thêm {100 - products.length} sản phẩm </span>
        </div>
        <Button
          type="primary"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          icon={<PlusOutlined />}
        >
          <Link to="/seller/products/category" style={{ color: "white" }}>
            Thêm một sản phẩm mới
          </Link>
        </Button>
      </div>
      <div className="products-all_content">
        <div className="products-all_content_header">
          <ul>
            <li className="products-all_list-name">Tên sản phẩm</li>
            <li className="products-all_list-header"> phân loại hàng</li>
            <li className="products-all_content_price products-all_list-header">
              giá
              <div>
                <CaretUpFilled />
                <CaretDownFilled />
              </div>
            </li>
            <li className="products-all_list-header"> Kho hàng</li>
            <li className="products-all_list-header">đã bán</li>
            <li>xóa</li>
          </ul>
        </div>
        <div className="products-all_content_show">
          {products.map((product) => {

            
            return (
              <div className="products-all_item" key={product._id}>
                <div className="products-all_name">
                  <img
                    src={product.images[0].path}
                    className="products-all-img-product"
                    alt=""
                  ></img>
                  <span>{product.name}</span>
                </div>

                <div className="products-all_list-info">
                  <ul>
                    <li className="products-all_list-item">{product.items}</li>
                    <li className="products-all_list-item">{product.price || product.priceMin}</li>
                    <li
                      className="products-all_list-item"
                      style={{ paddingLeft: 30 }}
                    >
                      {product.quantily}
                    </li>
                    <li
                      className="products-all_list-item"
                      style={{ paddingLeft: 30 }}
                    >
                      {product.sold}
                    </li>
                  </ul>
                </div>
                <Button
                  onClick={() =>
                    handlerDeleteProduct(product._id, product.images)
                  }
                >
                  Xóa
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductsAll;
