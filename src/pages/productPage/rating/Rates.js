import { Avatar, Rate } from "antd";
import React, { useState } from "react";
import "./rate.scss";
import { UserOutlined, LikeFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import productPageSlice from "../productPageSlice";
const selectFilter = [
  "Tất Cả",
  "5 Sao",
  "4 Sao",
  "3 Sao",
  "2 Sao",
  "1 Sao",
  "Có Bình Luận",
  "Có Hình Ảnh/Video",
];
function Rates({ rates, totalStar, productId }) {
  const [isActive, setIsActive] = useState(0);
  const [selectedFilterRate, setSelectedFilterRate] = useState("Tất Cả");

  const dispatch = useDispatch();
  const [zoomImg, setZoomImg] = useState(false);
  const handlePickFilter = (select, index) => {
    setSelectedFilterRate(select);
    if (index !== isActive) {
      setIsActive(index);

      dispatch(
        productPageSlice.actions.filterRatesRequest({
          option: select,
          productId: productId,
        })
      );
    }
  };

  const handleLikeRate =  (rate,checkLike) => {
    dispatch(
      productPageSlice.actions.likeRateRequest({ rate, selectedFilterRate,checkLike })
    );
  };
  return (
    <div className="rates section">
      <h1>ĐÁNH GIÁ SẢN PHẨM</h1>
      <div className="rates-filter">
        <div className="rates-filter_index">
          <div>
            <span className="product-rating__score">{totalStar} </span>
            <span className="product-rating__score2">trên 5</span>
          </div>
          <div>
            <Rate
              style={{ fontSize: "16px" }}
              value={totalStar}
              disabled
              allowHalf
            />
          </div>
        </div>
        <div className="rate-filter_item">
          {selectFilter.map((select, index) => {
            return (
              <div
                key={index}
                className={`product-rating-overview__filter ${
                  isActive === index
                    ? "product-rating-overview__filter--active"
                    : ""
                } `}
                onClick={() => handlePickFilter(select, index)}
              >
                {select}
              </div>
            );
          })}
        </div>
      </div>

      {rates.length === 0 ? (
        <div className="rate-nodata">
          <div className="rate-nodata_img">
            <img
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/pdp/eac95a8ac896158642c2761a9e9cd52e.png"
              alt=""
            />
          </div>
          <div className="rate-nodata_text">
            <span>Chưa có đánh giá</span>
          </div>
        </div>
      ) : (
        rates.map((rate, index) => {
          const checkLike = rate.usersLike.includes(rate.user.uid);
          return (
            <div className="rate-item" key={index}>
              <div className="rate-item_avatar">
                <Avatar size={50} icon={<UserOutlined />} />
              </div>

              <div className="rate-item__info">
                <div className="rate-item__info_name">{rate.user.nameUser}</div>
                <Rate disabled style={{ fontSize: "12px" }} value={rate.star} />
                {rate.productType && (
                  <div className="rate-item__info_type">
                    <span>Phân loại hàng: </span>
                    <span>{rate.productType}</span>
                  </div>
                )}
                <div className="rate-item__info_comment">
                  <span>{rate.comment}</span>
                </div>
                {rate.imgRate && (
                  <div
                    className={`rate-item__info_img ${
                      zoomImg && "rate-item__info_img-active"
                    }`}
                    onClick={() => setZoomImg(!zoomImg)}
                  >
                    <img src={rate.imgRate} alt="" />
                  </div>
                )}
                {zoomImg && (
                  <div className="rate-item__info_img-zoom">
                    <img src={rate.imgRate} alt="" />
                  </div>
                )}
                <div className="rate-item__info-date">
                  <span>{rate.dateCreated}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "color: rgba(0,0,0,.4)",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}

                  className={checkLike ? "rate-item__like-active" : ""}
                  onClick={() => handleLikeRate(rate,checkLike)}
                >
                  <LikeFilled  style={{ fontSize: "20px", marginRight: 6 }} />
                  <span>{rate.likeRate > 0 ? rate.likeRate : "Hữu Ích?"}</span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Rates;
