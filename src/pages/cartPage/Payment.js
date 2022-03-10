import React, { useEffect, useState } from "react";
import { Button, Steps } from "antd";
import "./payment.scss";
import { ShopOutlined, WechatOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import FooterCheckOut from "./FooterCheckOut";
import { useDispatch, useSelector } from "react-redux";
import { billSelector, currentUserSelector, orderSelector } from "../../redux/selector";
import formatCash from "../../hook/useFortmatCash";
import billSlice from "./billSlice";
import orderSlice from "../../redux/sliceCommon/orderSlice";
import { useNavigate } from "react-router-dom";
import { Spin} from 'antd';
import notificationSlice from "../../components/notification/notificationSlice";
const { Step } = Steps;
function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bill = useSelector(billSelector);
  const { freeShip, shipPriceTotal } = useSelector(billSelector);
  const user = useSelector(currentUserSelector);
  const order = useSelector(orderSelector);
  const [methodShip, setMethodShip] = useState("cod");
  const [dayShip, setDayShip] = useState("");
  const [monthShip, setMonthShip] = useState("");

  const onChangeMethodShip = (e) => {
    setMethodShip(e.target.value);
  };

  useEffect(() => {
    if (bill?._id) {
      if (!bill.address) {
        dispatch(
          billSlice.actions.handleAddressRequest({
            address: user?.address[0],
            uid: user.uid,
          })
        );
      }
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user.name && bill._id === "") {
      dispatch(billSlice.actions.getBillRequest(user.uid));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (bill.productsBill.length === 0 && bill._id) {
      navigate("../cart");
    }
  }, [bill, navigate]);

  useEffect(() => {
    document.title = "Thông tin thanh toán | Tiki";

    return () => {
      document.title = "ANTECH - Chợ điện tử";
    };
  }, []);
  const handleFreeShip = (checked) => {
    dispatch(
      billSlice.actions.handleFreeShipRequest({
        bill,
        checked,
      })
    );
      if(checked) {
        dispatch(notificationSlice.actions.showNotification({
          message: "Mã FreeShip được áp dụng thành công"
        }))
      }
  
  };

  useEffect(() => {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth();

    setDayShip(day + 3);
    setMonthShip(month + 1);
  }, []);



  const handleOder = () => {
    if (bill._id) {
      dispatch(
        orderSlice.actions.createOrderRequest({
          bill,
          methodShip,
        })
      );

      dispatch(notificationSlice.actions.showNotification({
        message: "Bạn đã đặt hàng thành công"
      }))


      navigate("/customer/purchase/confirm")
     
    }
  };


  
  return (
    <>
      <div className="shipping-header">
        <div className="container">
          <Steps current={2}>
            <Step title="Đăng nhập" />
            <Step title="Địa chỉ giao hàng" />
            <Step title="Thanh toán & đặt mua" />
          </Steps>
        </div>
      </div>
      <div className="payment-content section">
        <div className="container">
          <h2 className="payment-title">1. Chọn hình thức giao hàng</h2>

          <div className="row ">
            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
              <div className="_1G9Cv7"> </div>

              {bill.productsBill.map((shop, index) => {
                return (
                  <div className="payment-deliver" key={index}>
                    <div className="payment-deliver_header">
                      <div className="col-sp">
                        <span style={{ fontSize: "18px", color: "#222" }}>
                          Sản phẩm
                        </span>
                      </div>
                      <div className="m3csa"></div>
                      <div className="col-unitPrice">
                        <span className="_1_W4l_">Đơn giá</span>
                      </div>
                      <div className="col-quantily">
                        <span className="_1_W4l_">Số lượng</span>
                      </div>
                      <div className="col-price">
                        <span className="_1_W4l_">Thành tiền</span>
                      </div>
                    </div>

                    <div className="payment-item">
                      <div className="payment-product">
                        <div className="payment-product_shop">
                          <ShopOutlined style={{ fontSize: "2rem" }} />
                          <span className="payment-product_shopname">
                            {shop.shopName}
                          </span>
                          <div className="payment-product_shopchat">
                            <WechatOutlined style={{ marginRight: 8 }} />
                            <span>Chat ngay</span>
                          </div>
                        </div>

                        {shop.products.map((product, index) => {
                          return (
                            <div className="payment-product_info" key={index}>
                              <div className="col-sp">
                                <div className="payment-product_img">
                                  <img
                                    src={product.imageProduct}
                                    alt=""
                                    style={{ width: 50, height: 50 }}
                                  ></img>
                                </div>
                                <span className="payment-product_name">
                                  {product.nameProduct}
                                </span>
                              </div>
                              <div className="m3csa">
                                <span className="payment-product_type">
                                  {product.type && `loại: ${product?.type}`}
                                </span>
                              </div>
                              <div className="col-unitPrice">
                                <span>{`${formatCash(
                                  product.priceProduct
                                )}đ`}</span>
                              </div>
                              <div className="col-quantily">
                                <span>{product.quantilyOder}</span>
                              </div>
                              <div className="col-price">
                                <span>{`${formatCash(
                                  product.intoMoney
                                )}đ`}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="payment-voucher">
                        <div className="_1jqQS1">
                          <img
                            src="https://frontend.tikicdn.com/_desktop-next/static/img/mycoupon/coupon_icon.svg"
                            style={{ width: 40, marginRight: 12 }}
                            alt=""
                          ></img>
                          <span>Voucher của Shop</span>
                        </div>
                        <div>
                          <Button>Chọn voucher</Button>
                        </div>
                      </div>
                      <div className="payment-ship">
                        <div className="payment-nameship">
                          <span>Đơn vị vận chuyển :</span>
                          <span>Nhanh</span>
                        </div>
                        <div className="payment-date">
                          <span>{`Nhận hàng vào ngày ${dayShip}/${monthShip} - ${
                            dayShip + 3
                          }/${monthShip}`}</span>
                        </div>
                        <div className="payment-costShip">
                          {freeShip && (
                            <div
                              style={{
                                textDecoration: "line-through",
                                color: "rgb(120, 120, 120)",
                              }}
                            >{`${formatCash(shop.shipPriceOld)}đ`}</div>
                          )}
                          <span>{`${formatCash(shop.shipPrice)}đ`}</span>
                        </div>
                      </div>
                      <div className="payment-total">
                        <span>{`Tổng số tiền (${shop.products.length} sản phẩm):`}</span>
                        <span>{`${formatCash(
                          shop.totalShop + shop.shipPrice
                        )}đ`}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="payment-method">
                <div className="payment-method_header">
                  <h2 className="payment-title">
                    2. Chọn hình thức Thanh toán
                  </h2>
                </div>
                <div className="payment-method_content">
                  <Radio.Group
                    onChange={onChangeMethodShip}
                    value={methodShip}
                    size="large"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div className="payment-method_item">
                      <Radio value="cod">
                        <img
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg"
                          alt=""
                        />
                        <span> Thanh toán tiền mặt khi nhận hàng</span>
                      </Radio>
                    </div>
                    <div className="payment-method_item">
                      <Radio value="credit">
                        <img
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-credit.svg"
                          alt=""
                        />
                        <span>
                          Thanh toán bằng thẻ quốc tế Visa, Master, JCB
                        </span>
                      </Radio>
                    </div>
                    <div className="payment-method_item">
                      <Radio value="momo">
                        <img
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-momo.svg"
                          alt=""
                        />
                        <span>Thanh toán bằng ví MoMo</span>
                      </Radio>
                    </div>
                    <div className="payment-method_item">
                      <Radio value="atm">
                        <img
                          src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-atm.svg"
                          alt=""
                        />
                        <span>
                          Thẻ ATM nội địa/Internet Banking (Hỗ trợ Internet
                          Banking)
                        </span>
                      </Radio>
                    </div>
                  </Radio.Group>
                </div>
              </div>
              <div className="payment-confirm">
                <div className="payment-btn" onClick={handleOder}>
                  <span>ĐẶT MUA</span>
                </div>
                <span>
                  (Xin vui lòng kiểm tra lại đơn hàng trước khi Đặt Mua)
                </span>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
              <div className="sticky-bill">
                <div className="payment-address">
                  <div className="payment-address_header">
                    <span>Địa chỉ giao hàng</span>
                    <Button
                      onClick={() => {
                        navigate("../shipping");
                      }}
                    >
                      Sửa
                    </Button>
                  </div>
                  <div className="payment-address_content">
                    <div className="payment-address_name">
                      <span>{bill.address.name}</span>
                    </div>
                    <div className="">
                      <span>
                        {bill.address ? `${bill.address.address}` : ""}
                      </span>
                    </div>
                    <div>
                      <span>
                        {" "}
                        {bill.address
                          ? `Điện thoại: ${bill.address.phoneNumber}`
                          : ""}{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="payment-discount">
                  <div className="payment-discount_header">
                    <span>ANTECH Khuyến Mãi</span>
                    <span>có thể chọn 2</span>
                  </div>
                  <div className="payment-discount_btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 60"
                      className="coupon-bg"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g stroke={freeShip ? "#017FFF" : ""}>
                          <g>
                            <g>
                              <g>
                                <g>
                                  <path
                                    fill={freeShip ? "#E5F2FF" : "#FFF"}
                                    d="M248 0c4.418 0 8 3.582 8 8v44c0 4.418-3.582 8-8 8H64.5c0-2.21-1.79-4-4-4s-4 1.79-4 4H8c-4.418 0-8-3.582-8-8V8c0-4.418 3.582-8 8-8h48.5c0 2.21 1.79 4 4 4s4-1.79 4-4H278z"
                                    transform="translate(-544 -2912) translate(80 2252) translate(0 460) translate(464) translate(0 200)"
                                  ></path>
                                  <g
                                    stroke={freeShip ? '"#017FFF"' : "#EEE"}
                                    strokeDasharray="2 4"
                                    strokeLinecap="square"
                                  >
                                    <path
                                      d="M0.5 0L0.5 48"
                                      transform="translate(-544 -2912) translate(80 2252) translate(0 460) translate(464) translate(0 200) translate(60 8)"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <div className="payment-discount_img">
                      <img
                        src="https://salt.tikicdn.com/cache/128x128/ts/upload/eb/15/20/4bc1f4965c9869091d9dfe3e1b8fc9ab.png"
                        alt="Giảm 30K phí vận chuyển"
                      ></img>
                    </div>
                    <div className="payment-discount_pick">
                      <span>Giảm 30k</span>
                      {freeShip ? (
                        <Button
                          size="small"
                          style={{
                            backgroundColor: "#fd7e14",
                            color: "#fff",
                            borderRadius: 4,
                          }}
                          onClick={() => handleFreeShip(false)}
                        >
                          Bỏ Chọn
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          style={{
                            backgroundColor: "#fd7e14",
                            color: "#fff",
                            borderRadius: 4,
                          }}
                          onClick={() => handleFreeShip(true)}
                        >
                          Áp Dụng
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="payment-oder">
                  <div className="payment-oder_header">
                    <div className="payment-oder_info">
                      <span style={{ color: "#000", fontWeight: "bold" }}>
                        Đơn hàng
                      </span>
                      <div>
                        <span
                          style={{ color: "rgb(120, 120, 120)" }}
                        >{`${bill?.productsTotal.length} sản phẩm `}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        navigate("../cart");
                      }}
                    >
                      Sửa
                    </Button>
                  </div>
                  <div className="payment-oder_price">
                    <div className="payment-oder_row">
                      <span>Tạm tính</span>
                      <span>{`${
                        bill.tempCost && formatCash(bill.tempCost)
                      }đ`}</span>
                    </div>
                    <div className="payment-oder_row">
                      <span>Phí vận chuyển</span>
                      <span>{`${formatCash(shipPriceTotal)}đ`}</span>
                    </div>
                    {freeShip && (
                      <div className="payment-oder_row">
                        <span>Khuyến mãi vận chuyển</span>
                        <span>{`-${formatCash(30000)}đ`}</span>
                      </div>
                    )}
                    <div className="payment-oder_row">
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#000",
                          fontWeight: "bold",
                        }}
                      >
                        Thành tiền
                      </span>

                      <span className="payment-oder_cost">{`${
                        bill.total && formatCash(bill.total + shipPriceTotal)
                      }đ`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterCheckOut />
    </>
  );
}

export default Payment;
