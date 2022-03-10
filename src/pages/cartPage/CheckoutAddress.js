import React, { useState } from "react";
import "./shipping.scss";
import { useSelector, useDispatch } from "react-redux";
import { currentUserSelector } from "../../redux/selector";
import { Button, Steps } from "antd";
import FormShipping from "./FormShipping";

import currentUserSlice from "../../features/modals/currentUserSlice";
import billSlice from "./billSlice";
import FooterCheckOut from "./FooterCheckOut";

const { Step } = Steps;
function CheckoutAddress() {
  const dispatch = useDispatch();

  const user = useSelector(currentUserSelector);
  const [openForm, setOpenForm] = useState(false);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [indexForm, setIndexForm] = useState();

  const [address, setAddress] = useState({});
  const handleEditAddress = (address, index) => {
    setOpenForm(false);
    setOpenFormEdit(true);
    setIndexForm(index);
    setAddress(address);
  };

  const handleDeleteAddress = (index) => {
    const address = [...user.address];

    address.splice(index, 1);

    dispatch(
      currentUserSlice.actions.editUserRequest({
        ...user,
        address,
      })
    );
  };

  const handlePickAddress = (index) => {
    if (user.uid) {
      dispatch(
        billSlice.actions.handleAddressRequest({
          address: user.address[index],
          uid: user.uid,
        })
      );
    }

    window.history.back();
  };

  return (
    <div className="shipping-page">
      <div className="shipping-header">
        <div className="container">
          <Steps current={1}>
            <Step title="Đăng nhập" />
            <Step title="Địa chỉ giao hàng" />
            <Step title="Thanh toán & đặt mua" />
          </Steps>
        </div>
      </div>
      <div className="shipping-content">
        <div className="container">
          <div className="shipping-content_title">
            <p>2. Địa chỉ giao hàng</p>
            {user.address[0] ? (
              <p>chọn địa chỉ giao hàng có sẳn bên dưới:</p>
            ) : (
              <p>Bạn chưa có địa chỉ nhận hàng</p>
            )}
          </div>

          {user?.address[0] ? (
            <>
              <div className="shipping-show">
                <div className="row">
                  {user.address
                    ? user.address.map(function (address, index) {
                        return (
                          <div
                            className="col-xl-6 col-lg-6 col-md-6 col-sm-6"
                            key={index}
                          >
                            <div
                              className="shipping-show_item"
                              style={
                                index === 0
                                  ? { border: "1px dashed rgb(0, 153, 0)" }
                                  : { border: "1px solid rgb(221, 221, 221)" }
                              }
                            >
                              <div className="shipping-item_header">
                                <span className="shipping-name">
                                  {address.name}
                                </span>
                                {index === 0 && <span>Mặc định</span>}
                              </div>
                              <div className="shipping-address">
                                <span>{address.address}</span>
                              </div>
                              <div>VIệt Nam</div>
                              <div className="shipping-phoneNumber">
                                <span>{`Điện thoại: ${address.phoneNumber}`}</span>
                              </div>
                              <div className="shipping-item_btn">
                                <Button
                                  style={
                                    index === 0
                                      ? {
                                          backgroundColor: "#fd7e14",
                                          marginRight: 8,
                                          color: "white",
                                        }
                                      : {
                                          marginRight: 8,
                                          color: "white",
                                          backgroundColor: "rgb(98, 100, 85)",
                                        }
                                  }
                                  onClick={() => handlePickAddress(index)}
                                >
                                  Giao đến địa chỉ này
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleEditAddress(address, index)
                                  }
                                >
                                  Sửa
                                </Button>

                                {index !== 0 && (
                                  <Button
                                    style={{ marginLeft: 8 }}
                                    onClick={() => handleDeleteAddress(index)}
                                  >
                                    Xóa
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
              <div>
                <span>Bạn muốn giao hàng đến địa chỉ khác ? </span>
                <span
                  style={{ color: "#fd7e14", cursor: "pointer" }}
                  onClick={() => {
                    setOpenForm(true);
                    setOpenFormEdit(false);
                  }}
                >
                  {" "}
                  Thêm địa chỉ giao hàng mới
                </span>
              </div>
            </>
          ) : (
            <Button
              onClick={() => {
                setOpenForm(true);
              }}
            >
              Tạo địa chỉ mới
            </Button>
          )}

          {openForm && <FormShipping setOpenForm={setOpenForm} method="POST" />}
          {openFormEdit && (
            <FormShipping
              setOpenFormEdit={setOpenFormEdit}
              method="EDIT"
              index={indexForm}
              address={address}
            />
          )}
        </div>
      </div>
      <FooterCheckOut />
    </div>
  );
}

export default CheckoutAddress;
