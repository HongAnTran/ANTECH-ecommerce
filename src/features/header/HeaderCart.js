import React from "react";
import "./header.scss";

import { useNavigate, useParams ,} from "react-router-dom";
import { Button } from "antd";
import lengthCart from "../../hook/lengthCart";
import formatCash from "../../hook/useFortmatCash";
function HeaderCart({ carts }) {
  const param = useParams();
  const navigate = useNavigate();

  const handlerClickItem = (productId) => {
  
    if (productId !== param.productId) {
      navigate(`/${productId}`);
    }
  };



  return (
    <div className="header-cart">
      <div className="header-cart_img">
        <img
          src="https://salt.tikicdn.com/ts/upload/40/44/6c/b80ad73e5e84aeb71c08e5d8d438eaa1.png"
          alt=""
          className="img-logo"
        />
        <div className="header-cart_quantily">{lengthCart(carts)}</div>
      </div>
      <h4 className="header-cart_text">Giỏ Hàng</h4>
      <div className="header-cart_hover">
        {carts?.length === 0 ? (
          <div className="header-cart_none">
            <img
              className="header-cart_none-img"
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png"
              alt=""
            ></img>
            <span>Chưa có sản phẩm</span>
          </div>
        ) : (
          <div className="header-cart_list">
            <div>
              <span>Sản phẩm mới thêm</span>
            </div>
            <ul style={{ padding: 0, marginTop: 8 }}>
              {carts.map((item, index) => {
                return item.products.map((product, index) => {
                  return (
                    
                    <li
                      className="header-cart_item"
                      key={index}
                      onClick={() => handlerClickItem(product.productId)}
                    >
                      <img src={product.imageProduct} alt="" />
                      <span className="header-cart_item-name">
                        {product.nameProduct}
                      </span>
                      <span
                        style={{ color: "#fd7e14", fontWeight: "500" }}
                      >{`₫${formatCash(product.priceProduct)}`}</span>
                    </li>
                  );
                });
              })}
            </ul>
            <div className="header-cart_btn">
              <Button
                style={{ backgroundColor: "#fd7e14", color: "#fff" }}
                onClick={() => {
                  navigate("/checkout/cart");
                }}
              >
                Xem Giỏ Hàng
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderCart;
