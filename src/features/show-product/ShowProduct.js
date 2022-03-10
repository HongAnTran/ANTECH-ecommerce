import { Button } from "antd";
import React, { useState } from "react";
import Products from "./Products";
import "./showProducts.scss";

const menuItem = [
  {
    iconUrl:
      "https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp",
    name: "Dành cho bạn",
  },
  {
    iconUrl:
      "https://salt.tikicdn.com/cache/w100/ts/personalish/41/99/9a/8898607d7fca4b79775a708c57a8152f.png.webp",
    name: "Deal Hot",
  },
  {
    iconUrl:
      "https://salt.tikicdn.com/cache/w100/ts/product/bd/94/38/3b05a8e8f337630446a7e008a4b86a22.jpg.webp",
    name: "Điện Thoại",
  },
  {
    iconUrl:
      "https://salt.tikicdn.com/cache/w100/ts/personalish/0f/59/9d/215fa18ef72e430eefcbfe5355cab8e2.png.webp",
    name: "Rẻ vô đối",
  },
  {
    iconUrl:
      "https://salt.tikicdn.com/cache/w100/ts/personalish/7d/8a/6e/d8b76e2c43cbd06b7e1aa3ab8c54df64.png.webp",
    name: "Hàng mới",
  },
  {
    iconUrl:
      "https://salt.tikicdn.com/cache/w100/ts/personalish/8f/97/0e/f3881b536acf0bc31cc6e3e5712e386b.jpg.webp",
    name: "Xu hướng công nghệ",
  },
];

function ShowProduct() {
  const [active, setActive] = useState(0);

  const handleItemClick = (index) => {
    setActive(index);
  };
  return (
    <div className="suggest-products section">
      <div className="container">
        <div className="suggest-products_container">
          <div className="suggest-products_header">
            <h1 className="suggest-products_title">Gợi Ý Cho Hôm Nay</h1>
          </div>
          <div className="suggest-products_menu">
            <div className="row">
              {menuItem.map((item, index) => {
                return (
                  <div
                    className="col-xl-2 col-lg-2 col-md-2 col-sm-2"
                    key={index}
                  >
                    <div
                      className={`suggest-menu_item p-3 ${
                        active === index ? "active" : ""
                      }`}
                      onClick={() => handleItemClick(index)}
                    >
                      <div className="suggest-menu_icon">
                        <img src={item.iconUrl} alt=""></img>
                      </div>

                      <div className="suggest-menu_name">
                        <h2>{item.name}</h2>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
                 <Products />

                 <div className="suggest-footer">
                    <Button  type="primary" style={{backgroundColor:'#fd7e14'}} >Xem Thêm </Button>
                 </div>
        </div>
      </div>
    </div>
  );
}

export default ShowProduct;
