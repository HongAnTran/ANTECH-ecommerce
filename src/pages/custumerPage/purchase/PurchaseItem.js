import React, { useEffect, useState } from "react";
import ButtonCus from "../../../components/buttons/ButtonCus";
import "./purchaseItem.scss";
import formatCash from "../../../hook/useFortmatCash";
import { ShopOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Rate, Alert, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import orderSlice from "../../../redux/sliceCommon/orderSlice";
import { useNavigate } from "react-router-dom";
import notificationSlice from "../../../components/notification/notificationSlice";
import cartUserSlice from "../../../redux/sliceCommon/cartUserSlice";
import billSlice from "../../../pages/cartPage/billSlice";
import UpImage from "../../../components/upImage/UpImage";
import upImageSlice from "../../../components/upImage/upImageSlice";
import { imagesSelector } from "../../../redux/selector";
import * as api from "../../../api/api";

const { confirm } = Modal;
const listRateSelecter = [
  "Chất lượng sản phẩm tuyệt vời",
  "Đóng gói sản phẩm rất đẹp và chắc chắn",
  "Shop phục vụ phụ rất tốt",
  "Rất đáng tiền",
  "Thời gian giao hàng rất nhanh",
];

function PurchaseItem({ order }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgRate = useSelector(imagesSelector);

  const handleClick = () => {
    console.log("123");
  };

  const [currentDay, setCurrentDay] = useState("");
  const [orderRate, setOrderRate] = useState();
  const [isConditionGift, setIsConditionGift] = useState(false);
  const [userRate, setUserRate] = useState({
    star: 5,
    comment: "",
  });

  const [visibleModalRate, setVisibleModalRate] = useState(false);

  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const y = `${year}-${month}-${day}`;

    const current = new Date(y).getTime();
    setCurrentDay(current);

    return () => {
      // clean up state img when component unmount
      dispatch(upImageSlice.actions.deleteAllImage());
    };
  }, [dispatch]);

  // check condition to give a gift
  useEffect(() => {
    if (userRate.comment.length >= 50 && imgRate.length > 0) {
      setIsConditionGift(true);
    } else {
      setIsConditionGift(false);
    }
  }, [userRate, imgRate]);
  const handleReceive = (order) => {
    confirm({
      title: "Xác nhận đã nhận hàng",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn đã nhận hàng và thanh toán cho đơn vị vân chuyển ${formatCash(
        order.totalCost
      )}đ ?`,
      okText: "Xác nhận",
      cancelText: "Hủy bỏ",
      onOk() {
        dispatch(
          orderSlice.actions.recieveOrderRequest({
            id: order._id,
            productsOrder: order.productsOrder,
          })
        );

        navigate("./complete");

        dispatch(
          notificationSlice.actions.showNotification({
            title: "XÁC NHẬN GIAO HÀNG THÀNH CÔNG",
            message: "Hãy đánh giá sản phẩm để được nhận 200xu",
          })
        );
      },
    });
  };

  const handleReBuy = (order) => {
    const productAddCart = order.productsOrder.map((product) => {
      return {
        productId: product.productId,
        shopName: order.shopName,
        seller: order.uid,
        nameProduct: product.nameProduct,
        priceProduct: product.priceProduct,
        imageProduct: product.imageProduct,
        type: product.type,
        quantily: product.quantily,
        quantilyOder: product.quantilyOder,
      };
    });
    navigate("/checkout/cart");

    dispatch(
      cartUserSlice.actions.addProductToCartRequest({
        shopName: order.shopName,
        uid: order.uid,
        seller: order.seller,
        products: productAddCart,
      })
    );

    order.productsOrder.forEach((product) => {
      dispatch(
        billSlice.actions.handleBillAddRequest({
          uid: order.uid,
          products: product,
        })
      );
    });
  };

  const handleRate = (order) => {
    setVisibleModalRate(true);
    setOrderRate(order);
  };

  const handleRateConfirmed = async () => {
   await  api.createRate({
      ...userRate,
      imgRate: imgRate[0],
      productsRate: orderRate.productsOrder,
      uid: orderRate.uid,
      orderId: orderRate._id,
      conditionGift: isConditionGift,
    });

    handleCancelModal();
    dispatch(
      notificationSlice.actions.showNotification({
        message: "Đánh giá thành công",
      })
    );

    dispatch(orderSlice.actions.getOrderRequest({ uid:orderRate.uid, type: "ĐÃ GIAO" }));
  };

 
  const handleCancelModal = () => {
    setVisibleModalRate(false);
    dispatch(upImageSlice.actions.deleteAllImage());
    
    setUserRate({
      comment: "",
      star: 5,
    });
  };
  
  
  const handlePickComment = (option) => {
    setUserRate({
      ...userRate,
      comment: userRate.comment + option,
    });
  };
  return (
    <>
      <div className="Purchase-item">
        <div className="Purchase-item_header">
          <div className="Purchase-item_shop">
            <ShopOutlined style={{ marginRight: 8, fontSize: "16px" }} />
            <span className="Purchase-item_shopname">{order.shopName}</span>
            <button
              size="small"
              className="stardust-button stardust-button--primary"
            >
              <svg
                viewBox="0 0 17 17"
                className="shopee-svg-icon icon-btn-chat"
                style={{ fill: "white" }}
              >
                <g fillRule="evenodd">
                  <path
                    d="M13.89 0C14.504 0 15 .512 15 1.144l-.003.088-.159 2.117.162.001c.79 0 1.46.558 1.618 1.346l.024.15.008.154v9.932a1.15 1.15 0 01-1.779.963l-.107-.08-1.882-1.567-7.962.002a1.653 1.653 0 01-1.587-1.21l-.036-.148-.021-.155-.071-.836h-.01L.91 13.868a.547.547 0 01-.26.124L.556 14a.56.56 0 01-.546-.47L0 13.429V1.144C0 .512.497 0 1.11 0h12.78zM15 4.65l-.259-.001-.461 6.197c-.045.596-.527 1.057-1.106 1.057L4.509 11.9l.058.69.01.08a.35.35 0 00.273.272l.07.007 8.434-.001 1.995 1.662.002-9.574-.003-.079a.35.35 0 00-.274-.3L15 4.65zM13.688 1.3H1.3v10.516l1.413-1.214h10.281l.694-9.302zM4.234 5.234a.8.8 0 011.042-.077l.187.164c.141.111.327.208.552.286.382.131.795.193 1.185.193s.803-.062 1.185-.193c.225-.078.41-.175.552-.286l.187-.164a.8.8 0 011.042 1.209c-.33.33-.753.579-1.26.753A5.211 5.211 0 017.2 7.4a5.211 5.211 0 01-1.706-.28c-.507-.175-.93-.424-1.26-.754a.8.8 0 010-1.132z"
                    fillRule="nonzero"
                  ></path>
                </g>
              </svg>
              <span>Chat</span>
            </button>
            <button className="stardust-button">
              <svg
                enableBackground="new 0 0 15 15"
                viewBox="0 0 15 15"
                x="0"
                y="0"
                className="shopee-svg-icon icon-btn-shop"
              >
                <path d="m15 4.8c-.1-1-.8-2-1.6-2.9-.4-.3-.7-.5-1-.8-.1-.1-.7-.5-.7-.5h-8.5s-1.4 1.4-1.6 1.6c-.4.4-.8 1-1.1 1.4-.1.4-.4.8-.4 1.1-.3 1.4 0 2.3.6 3.3l.3.3v3.5c0 1.5 1.1 2.6 2.6 2.6h8c1.5 0 2.5-1.1 2.5-2.6v-3.7c.1-.1.1-.3.3-.3.4-.8.7-1.7.6-3zm-3 7c0 .4-.1.5-.4.5h-8c-.3 0-.5-.1-.5-.5v-3.1c.3 0 .5-.1.8-.4.1 0 .3-.1.3-.1.4.4 1 .7 1.5.7.7 0 1.2-.1 1.6-.5.5.3 1.1.4 1.6.4.7 0 1.2-.3 1.8-.7.1.1.3.3.5.4.3.1.5.3.8.3zm.5-5.2c0 .1-.4.7-.3.5l-.1.1c-.1 0-.3 0-.4-.1s-.3-.3-.5-.5l-.5-1.1-.5 1.1c-.4.4-.8.7-1.4.7-.5 0-.7 0-1-.5l-.6-1.1-.5 1.1c-.3.5-.6.6-1.1.6-.3 0-.6-.2-.9-.8l-.5-1-.7 1c-.1.3-.3.4-.4.6-.1 0-.3.1-.3.1s-.4-.4-.4-.5c-.4-.5-.5-.9-.4-1.5 0-.1.1-.4.3-.5.3-.5.4-.8.8-1.2.7-.8.8-1 1-1h7s .3.1.8.7c.5.5 1.1 1.2 1.1 1.8-.1.7-.2 1.2-.5 1.5z"></path>
              </svg>
              <span>xem shop</span>
            </button>
          </div>
          <div>
            <span className="Purchase-item_status">{order.status}</span>
          </div>
        </div>
        {order?.productsOrder.map((item, index) => (
          <div className="pruchase-item_body" key={index}>
            <div className="pruchase-item_bodyL">
              <div className="pruchase-item_img">
                <img src={item.imageProduct} alt="hàng" />
              </div>
              <div className="pruchase-item_info">
                <div className="pruchase-item_nameproduct">
                  <span>{item.nameProduct}</span>
                </div>
                <div>
                  <span style={{ color: "rgba(0,0,0,.54)" }}>
                    {item.type && `Phân loại hàng: ${item.type}`}
                  </span>
                </div>
                <div>
                  <span>{`x${item.quantilyOder}`}</span>
                </div>
              </div>
            </div>
            <div className="pruchase-item_price">
              <span>{`₫${formatCash(item.intoMoney)}`}</span>
            </div>
          </div>
        ))}
        <div className="pruchase-item_bottom">
          <div className="pruchase-item_total">
            <div>
              <span className="_gajw">Tổng số tiền:</span>
              <span className="_1MS3t2">{`₫${formatCash(
                order.totalCost
              )}`}</span>
            </div>
          </div>
          <div className="pruchase-item_btn">
            <div>
              {order.status === "CHỜ XÁC NHẬN" && (
                <span>Đang chờ người bán xác nhận </span>
              )}
              {order.status === "ĐANG GIAO" && (
                <span>Nhận hàng và thành toán sau {order.dayShip} </span>
              )}
              {order.status === "ĐÃ GIAO" && (
                <span>Đã giao và thanh toán thành công </span>
              )}
            </div>
            <div className="pruchase-item_interactive">
              {order.status === "CHỜ XÁC NHẬN" && (
                <>
                  <div className="pruchase-item_button">
                    <ButtonCus primary={true} onClick={handleClick}>
                      Liên Hệ Người Bán
                    </ButtonCus>
                  </div>
                  <div className="pruchase-item_button">
                    <ButtonCus onClick={handleClick}>Hủy Đơn Hàng</ButtonCus>
                  </div>
                </>
              )}
              {order.status === "ĐANG GIAO" && (
                <>
                  <div className="pruchase-item_button">
                    <ButtonCus
                      onClick={() => handleReceive(order)}
                      // disabled={currentDay < new Date(order.dayShip).getTime()}
                    >
                      Đã Nhận Hàng
                    </ButtonCus>
                  </div>
                  <div className="pruchase-item_button">
                    <ButtonCus primary={true} onClick={handleClick}>
                      Liên Hệ Người Bán
                    </ButtonCus>
                  </div>
                </>
              )}

              {order.status === "ĐÃ GIAO" && (
                <>
                  <div className="pruchase-item_button">
                    <ButtonCus
                      primary={true}
                      onClick={() => handleReBuy(order)}
                    >
                      Mua Lại
                    </ButtonCus>
                  </div>
                  <div className="pruchase-item_button">
                    <ButtonCus onClick={handleClick}>
                      Liên Hệ Người Bán
                    </ButtonCus>
                  </div>
                {!order.rate &&   <div className="pruchase-item_button">
                    <ButtonCus onClick={() => handleRate(order)}>
                      Đánh Giá
                    </ButtonCus>
                  </div>}
                </>
              )}

            
              {order.status === "ĐÃ HỦY" && (
                <>
                  <div className="pruchase-item_button">
                    <ButtonCus primary={true} onClick={handleClick}>
                      Mua Lại
                    </ButtonCus>
                  </div>
                  <div className="pruchase-item_button">
                    <ButtonCus onClick={handleClick}>
                      Liên Hệ Người Bán
                    </ButtonCus>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        okText="Đánh giá"
        cancelText="Hủy bỏ"
        width="800px"
        visible={visibleModalRate}
        onCancel={handleCancelModal}
        onOk={handleRateConfirmed}
        closable={false}
      >
        <div>
          <h3>Đánh giá sản phẩm</h3>
          <Alert
            description="Chia sẻ và cảm nhận của bạn về tất cả sản phẩm trong cùng một đơn hàng với tuối thiểu 50 ký tự 
      cùng ít nhất một hình ảnh để nhận 100 ANTECH xu ,Lưu ý:nếu đánh giá không phù hợp ANTECH xu có thể bị thu hồi
         "
            type="info"
          />
          <div className="rate-info_order">
            {orderRate &&
              orderRate.productsOrder.map((product, index) => (
                <div
                  key={index}
                  className=""
                  style={{ display: "flex", margin: "10px 0" }}
                >
                  <img
                    alt=""
                    src={product.imageProduct}
                    style={{ width: 60, marginRight: 12 }}
                  />
                  <div className="">
                    <h4>{product.nameProduct}</h4>
                    {product.type ? (
                      <span>Phân loại hàng: {product.type}</span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}

            <div style={{ textAlign: "center" }}>
              <Rate
                style={{ fontSize: 25 }}
                value={userRate.star}
                onChange={(star) => {
                  setUserRate({
                    ...userRate,
                    star: star,
                  });
                }}
              />
            </div>
            <div className="rate-options">
              {listRateSelecter.map((options) => {
                return (
                  <div
                    className="rate-options_item"
                    key={options}
                    onClick={() => handlePickComment(options)}
                  >
                    <p>{options}</p>
                  </div>
                );
              })}
            </div>

            <div className="rate-comments">
              <Input.TextArea
                placeholder="Hãy chia sẽ về những điều bạn thích về sản phẩm này nhé"
                style={{ marginBottom: "20px" }}
                value={userRate.comment}
                onChange={(e) =>
                  setUserRate({ ...userRate, comment: e.target.value })
                }
              ></Input.TextArea>
              <UpImage index={0} refImage='ref'/>
              <div style={{ textAlign: "right" }}>
                {!isConditionGift && (
                  <span>
                    Cần thêm{" "}
                    {50 - userRate.comment.length > 0
                      ? 50 - userRate.comment.length
                      : 0}{" "}
                    kí tự và 1 hình ảnh để nhận 100 ANTECH xu
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PurchaseItem;
