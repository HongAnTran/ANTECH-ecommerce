import { Avatar, Button } from "antd";
import React, { memo } from "react";
import "./infoShop.scss";
import { MessageOutlined, ShopOutlined } from "@ant-design/icons";

function InfoShop({ shopName, avtShop }) {
  return (
    <div className="info-shop section">
      <div className="info-shop_left">
        <div className="info-shop_img">
          {avtShop ? (
            <img src={avtShop} alt=""></img>
          ) : (
            <Avatar size="large">
              {shopName && shopName.charAt(0).toUpperCase()}
            </Avatar>
          )}
        </div>
        <div className="info-shop_name">
          <span>{shopName}</span>   
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              icon={<MessageOutlined />}
              style={{
                backgroundColor: "rgba(255, 87, 34, 0.1)",
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              chat ngay
            </Button>
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
                marginLeft: 10,
              }}
            >
              <ShopOutlined />
              Xem shop
            </Button>
          </div>
              
        </div>
     
     
   
      </div>
     
    </div>
  );
}

export default memo(InfoShop);
