import React, { useState, useEffect } from "react";
import "./cartPage.scss";
import { Button, Checkbox, Tooltip, Input, Modal, Result, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  billSelector,
  cartSelector,
  currentUserSelector,
} from "../../redux/selector";
import { useSelector, useDispatch } from "react-redux";
import lengthCart from "../../hook/lengthCart";
import billSlice from "./billSlice";
import formatCash from "../../hook/useFortmatCash";
import cartUserSlice from "../../redux/sliceCommon/cartUserSlice";
import Footer from "../../components/footer/Footer";
import { ShopOutlined, WechatOutlined } from "@ant-design/icons";

function ListProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(currentUserSelector);
  const cart = useSelector(cartSelector);
  const { discount, productsBill, address, total, tempCost, productsTotal } =
    useSelector(billSelector);
  const bill = useSelector(billSelector);
  const [productsBillAll, setProductsBillAll] = useState([]);
  useEffect(() => {
    if (user.uid && total === 0) {
      dispatch(billSlice.actions.getBillRequest(user.uid));
    }
  }, [user, dispatch]);

  const handleCheckItem = (e, item, index) => {
    const checked = e.target.checked;
    console.log(item) 
    if (checked) {
      dispatch(
        billSlice.actions.handleBillAddRequest({
          uid: user.uid,
          products: item,
        })
      );
    } else {
      dispatch(
        billSlice.actions.handleBillSubRequest({
          uid: user.uid,
          products: item,
          index,
        })
      );
    }
  };

  useEffect(() => {
    document.title = "Giỏ hàng | ANTECH.vn";
    return () => {
      document.title = "ANTECH - Chợ điện tử";
    };
  }, []);

  const handleQuantityAdd = (product, index, item) => {
    if (item.quantily > item.quantilyOder) {
      dispatch(
        cartUserSlice.actions.editQuantityRequest({
          index: index,
          uid: user.uid,
          method: "ADD",
          shopName: product.shopName,
        })
      );

      const checkItemInBill = productsTotal.findIndex(
        (product) =>
          product.productId === item.productId && product.type === item.type
      );
      if (checkItemInBill > -1) {
        dispatch(
          billSlice.actions.addQuantityRequest({
            bill,
            indexTotal: checkItemInBill,
            product: item,
            method: "ADD",
          })
        );
      }
    } else {
      message.warning(`Số lượng còn lại của sản phẩm này là ${item.quantily}`);
    }
  };

  const handleQuantitySub = (product, index, item) => {
    if (item.quantilyOder > 1) {
      dispatch(
        cartUserSlice.actions.editQuantityRequest({
          index: index,
          uid: user.uid,
          method: "SUB",
          shopName: product.shopName,
        })
      );

      const checkItemInBill = productsTotal.findIndex(
        (product) =>
          product.productId === item.productId && product.type === item.type
      );
      if (checkItemInBill > -1) {
        dispatch(
          billSlice.actions.addQuantityRequest({
            bill,
            indexTotal: checkItemInBill,
            product: item,
            method: "SUB",
          })
        );
      }
    } else {
      showConfirm(product, index);
    }
  };

  useEffect(() => {
    if (bill?._id) {
      if (!address) {
        dispatch(
          billSlice.actions.handleAddressRequest({
            address: user?.address[0],
            uid: user.uid,
          })
        );
      }
    }
  }, [dispatch, address, user]);

  const handleBuy = () => {
    if (productsBill.length > 0) {
      if (user.address[0]) {
        navigate("/checkout/payment");
      } else {
        navigate("/checkout/shipping");
      }
    } else {
      Modal.warning({
        title: "Bạn vẫn chưa chọn sản phẩm nào để mua",
        centered: true,
        okText: "OK, đã hiểu",
      });
    }
  };

  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    if (checked) {
      dispatch(
        billSlice.actions.addAllProductRequest({
          uid: user.uid,
          products: productsBillAll,
          cart: cart,
        })
      );
    } else {
      dispatch(
        billSlice.actions.removeAllProductRequest({
          uid: user.uid,
        })
      );
    }
  };

  const handleDeleteAll = () => {
    showConfirmDeleteAll()
  }

  useEffect(() => {
    let products = [];
    cart.forEach((item) => {
      item.products.forEach((product) => {
        products.push(product);
      });
    });
    setProductsBillAll(products);
  }, [cart]);

  const { confirm } = Modal;
  function showConfirm(product, index, item) {
    confirm({
      title: "Bạn muốn xóa sản phẩm này ?",
      icon: <ExclamationCircleOutlined />,
      cancelText: "Không",
      okText: "Xóa",
      centered: true,

      onOk() {
        dispatch(
          cartUserSlice.actions.deleteProductInCartRequest({
            index: index,
            uid: user.uid,
            shopName: product.shopName,
          })
        );

        const checkItemInBill = productsTotal.findIndex(
          (product) =>
            product.productId === item.productId && product.type === item.type
        );
        if (checkItemInBill > -1) {
          dispatch(
            billSlice.actions.handleBillSubRequest({
              uid: user.uid,
              products: item,
              index,
            })
          );
        }
      },
    });
  }

  function showConfirmDeleteAll() {
    confirm({
      title: "Bạn muốn xóa tất cả sản phẩm trong giỏ hàng ?",
      icon: <ExclamationCircleOutlined />,
      cancelText: "Không",
      okText: "Xóa",
      centered: true,

      onOk() {
          dispatch(cartUserSlice.actions.deleteAllProductInCartRequest({
            uid: user.uid,
          }))

        dispatch(
          billSlice.actions.removeAllProductRequest({
            uid: user.uid,
          })
        );
      },
    });
  }
  return (
    <>
      <div className="cart-content">
        <div className="container">
          <div className="cart-notification">
            <span>
              Miễn phí vận chuyển đơn từ 149K của mỗi nhà bán có logo
              <img
                src="https://salt.tikicdn.com/ts/upload/3d/e3/de/2c71b5485f7335d41cb3c06198035fe3.png"
                alt=""
                style={{ width: 76, height: 12, marginLeft: 8 }}
              />
            </span>
          </div>
          <div className="cart-main">
            <div className="row">
              <h1>Giỏ hàng</h1>
              {cart.length > 0 ? (
                <>
                  <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                    <div className="cart-main_header">
                      <div style={{ width: "40%" }}>
                        <Checkbox
                          style={{ marginRight: 12 }}
                          onChange={(e) => handleCheckAll(e)}
                          checked={
                            productsTotal.length !== 0 &&
                            productsTotal.length === productsBillAll.length
                          }
                        />
                        <span>{`Tất cả (${lengthCart(cart)} sản phẩm)`}</span>
                      </div>
                      <span className="cart-col_type"></span>

                      <span className="cart-col_unitPrice">đơn giá</span>
                      <span className="cart-col_quantily">Số lượng</span>
                      <span className="cart-col_total"> Thành tiền</span>
                      <div className="cart-col_btn">
                      <Tooltip placement="bottom" title="xóa tất cả"
                      
                      >
                        <Button icon={<DeleteOutlined />}
                        
                          onClick={handleDeleteAll}
                        ></Button>
                      </Tooltip>
                        </div>
                     
                    </div>

                    {cart.map((product, index) => {
                      return (
                        <div className="cart-main_item" key={index}>
                          <div className="cart-item_header">
                            <div className="payment-product_shop">
                              <ShopOutlined style={{ fontSize: "2rem" }} />
                              <span className="payment-product_shopname">
                                {product.shopName}
                              </span>
                              <div className="payment-product_shopchat">
                                <WechatOutlined style={{ marginRight: 8 }} />
                                <span>Chat ngay</span>
                              </div>
                            </div>
                          </div>

                          {product.products.map((item, index) => {
                            return (
                            
                            
                              <div className="cart-item_product" key={index}>
                                <div className="cart-item_firts">
                                  <Checkbox
                                    style={{ marginRight: "12px" }}
                                    onChange={(e) => {
                                      return handleCheckItem(e, item, index);
                                    }}
                                    checked={productsTotal.some(
                                      (pdbill) =>
                                        pdbill.productId === item.productId &&
                                        pdbill.type === item.type
                                    )}
                                  />
                            <Link to={`/${item.productId}`} >
                         
                                  <div className="cart-item_name">
                                    <img
                                      style={{
                                        width: 78,
                                        height: 78,
                                        marginRight: 8,
                                      }}
                                      src={item?.imageProduct}
                                      alt=""
                                    />
                                    <span>{item.nameProduct}</span>
                                  </div>
                                  </Link>
                                </div>
                      <span className="cart-col_type">
                        {item.type && ` loại: ${item.type} `}
                      </span>
                               
                                <span className="cart-col_unitPrice">{`${formatCash(
                                  item.priceProduct
                                )} đ`}</span>

                                <div className="cart-product_quantily cart-col_quantily">
                                  <Button
                                    onClick={() =>
                                      handleQuantitySub(product, index, item)
                                    }
                                    style={{padding:'4px 12px'}}
                                  >
                                    <MinusOutlined />
                                  </Button>
                                  <Input
                                    value={item.quantilyOder}
                                    className="product-info_quantily-input"
                                  />
                                  {/* <span className="product-info_quantily-input">{item.quantilyOder}</span> */}
                                  <Button
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                    onClick={() =>
                                      handleQuantityAdd(product, index, item)
                                    }
                                  >
                                    <PlusOutlined />
                                  </Button>
                                </div>

                                <div className="cart-product_cost cart-col_total">
                                  
                                  <span>{`${formatCash(
                                    item.intoMoney
                                  )} đ`}</span>
                                </div>
                             <div className="cart-col_btn">

                                <Button
                                  onClick={() =>
                                    showConfirm(product, index, item)
                                  }
                                  icon={<DeleteOutlined />}
                                ></Button>
                              </div>
                           </div>
                         
                            );
                          })}

                          <div className="cart-item_bottom">
                            <span
                              style={{
                                color: "#000",
                                fontSize: "16px",
                                marginRight: "8px",
                              }}
                            >
                              Shop khuyến mãi
                            </span>
                            <span>Vui lòng chọn sản phẩm trước</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
                    <div className="cart-page-right">
                      <div className="cart-deliver">
                        <div className="cart-deliver_header">
                          <span>Giao tới</span>
                          <span onClick={() => navigate("/checkout/shipping")}>
                            Thay đổi
                          </span>
                        </div>

                        {address ? (
                          <div className="cart-deliver_info">
                            <span>{address.name}</span>
                            <span>{address.phoneNumber}</span>
                          </div>
                        ) : (
                          <h4> Chưa cập nhập số điện thoại</h4>
                        )}

                        {address ? (
                          <div className="cart-deliver_address">
                            <span>{address.address}</span>
                          </div>
                        ) : (
                          <h4>Chưa cập nhập địa chỉ</h4>
                        )}
                      </div>
                      <div className="cart-bill">
                        <div className="cart-bill_top">
                          <div className="cart-bill_temp">
                            <span>Tạm tính</span>
                            {tempCost && (
                              <span>{`${formatCash(tempCost)}đ`}</span>
                            )}
                          </div>
                          <div className="cart-bill_temp">
                            <span>Giảm giá</span>
                            <span>{`${discount}đ`}</span>
                          </div>
                        </div>
                        <div className="cart-bill_bot">
                          <div className="cart-bill_total">
                            <span>Tổng cộng</span>
                            {total ? (
                              `${formatCash(total)} đ`
                            ) : (
                              <span>Vui lòng chọn sản phẩm</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="cart-bill_btn" onClick={handleBuy}>
                        <span> Mua Hàng {`(${productsTotal?.length})`}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Result
                  title="Không có sản phẩm nào trong giỏ hàng của bạn."
                  extra={
                    <Button type="primary" key="console">
                      <Link to="/">Tiếp tục mua sắm</Link>
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ListProduct;
