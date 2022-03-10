import React from "react";
import { Rate } from "antd";
import "./card.scss";

import { Link } from "react-router-dom";
import formatCash from "../../hook/useFortmatCash";
function Card({ discount, name, price, img, sold, priceMin, productId }) {
  return (
 
      <Link to={`/${productId}`}>
        <div className="card-container">

      
        <div className="card-img">
          <img src={img} alt=""></img>
        </div>
        <div className="card-content">
          <div className="card-content_top">
            <div className="card-name">
              <h3>{name}</h3>
            </div>
            {discount ? (
              <div className="card-option">
                <div className="card-option_item">
                  <span>Giảm {discount}%</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="card-bottom">
            <div className="card-rate">
              <Rate disabled={true} value={5} allowHalf={true} style={{}} />
            </div>
            <div className="card-price-new">
              <span>{price ? formatCash(price) : formatCash(priceMin)} ₫</span>
              <div className="card-count_quality">Đã bán {sold}</div>
            </div>
          </div>
        </div>
        </div>
      </Link>
  
  );
}

export default Card;
