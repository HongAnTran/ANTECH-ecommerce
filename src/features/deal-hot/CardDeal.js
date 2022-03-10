import React from "react";
import { Progress } from "antd";
import "./carddeal.scss";
function CardDeal({ name }) {
  return (
    <div className="card-deal">
      <div className="card-deal_img">
        <img
          src="https://salt.tikicdn.com/cache/200x200/ts/product/3b/80/1e/4edbeacad66ffb675e35b51ffa4efcaf.png.webp"
          alt=""
        />
      </div>
      {name ? (
        <div className="card-deal_name">
          <h4>{name}</h4>
        </div>
      ) : (
        ""
      )}
      <div className="card-deal_price">
        <span className="card-deal_cost">170.000 ₫</span>
        <span className="card-deal_percent">-13%</span>
      </div>
      <div className="card-deal_process">
        <div>
          <Progress
            percent={10}
            trailColor="rgb(255, 170, 175)"
            style={{ height: 20 }}
            format={(percent) =>
              percent <= 0 ? `vừa mở bán` : `đã bán ${percent}`
            }
            strokeColor="rgb(255, 66, 78)"
          />
        </div>
      </div>
    </div>
  );
}

export default CardDeal;
