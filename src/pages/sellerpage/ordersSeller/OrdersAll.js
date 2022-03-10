import React, { useState } from "react";
import ButtonCus from "../../../components/buttons/ButtonCus";
import "./orderAll.scss";
import formatCash from "../../../hook/useFortmatCash";
import { Modal, DatePicker, Form, notification } from "antd";
import { useDispatch ,useSelector } from "react-redux";
import orderSlice from "../../../redux/sliceCommon/orderSlice";
import moment from "moment";
import { currentUserSelector } from "../../../redux/selector";

function OrdersAll({ order }) {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idOrder, setIdOrder] = useState("");
  const [dateDeliver, setDateDeliver] = useState("");
    const { deliveryAddress } = useSelector(currentUserSelector)


  const handleConfirm = (idOrder) => {
    setIsModalVisible(true);

    setIdOrder(idOrder);
  };

  const handleOk = () => {
    if (dateDeliver) {
      dispatch(
        orderSlice.actions.confirmOrderRequest({
          id: idOrder,
          dayShip: dateDeliver,
        })
      );
      setIsModalVisible(false);
    } else {
      notification["error"]({
        message: "Vui lòng chọn ngày giao",
      });
    }
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handlePickDate = (e) => {
    const datetime = moment(e).format("YYYY-MM-DD");

    setDateDeliver(datetime);
  };


  function info(order) {
    Modal.info({
      title: 'Chi tiết đơn hàng',
      content: (
        <div>
          <p>Tên người nhận: {order.addressShip.name}</p>
          <p>Số điện thoại người nhận: {order.addressShip.phoneNumber}</p>
          <p>Địa chỉ giao hàng: {order.addressShip.address}</p>
          <p>Địa chỉ gửi hàng: {deliveryAddress}</p>
          <p>Bạn cần phải giao hàng cho đơn vị vận chuyển trước ngày {order.dayShip} nếu không hệ thống sẽ tự hủy đơn hàng</p>
        </div>
      ),
      onOk() {},
    });
  }
  
  return (
    <>
      <div className="orders-all">
        <div className="orders-all_header">
          <h1>{order.length} Đơn hàng</h1>
        </div>
        <div className="orders-all_body">
          <div className="orders-all_index">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                <div>
                  <span>Sản phẩm</span>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2">
                <div className="orders-all_col">
                  <span>Tổng đơn hàng</span>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2">
                <div className="orders-all_col">
                  <span>Tình trạng</span>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2">
                <div className="orders-all_col">
                  <span>Tương tác</span>
                </div>
              </div>
            </div>
          </div>

          {order.map((item, index) => {
            return (
              <div className="orders-all_item" key={index}>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    {item.productsOrder.map((product, index) => {
                      return (
                        <div className="orders-all_info" key={index}>
                          <div className="orders-all_img">
                            <img src={product.imageProduct} alt=""></img>
                          </div>
                          <div>
                            <span>{product.nameProduct}</span>
                            <div>{`x${product.quantilyOder}`}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2">
                    <div className="orders-all_col">
                      <span>{formatCash(item.totalCost)}</span>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2">
                    <div className="orders-all_col">
                      <span>{item.status}</span>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2">
                    <div>
                      {item.status === "CHỜ XÁC NHẬN" && (
                        <ButtonCus
                          primary={true}
                          onClick={() => handleConfirm(item._id)}
                        >
                          Xác nhận
                        </ButtonCus>
                      )}
                      {item.status === "ĐANG GIAO" && (
                        <ButtonCus primary={true}
                           onClick={() => info(item)} 
                        >Chi tiết</ButtonCus>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        title="Vui lòng chọn ngày giao hàng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form name="pickDate">
          <Form.Item name="date" label="Chọn ngày giao">
            <DatePicker
              value={dateDeliver}
              onChange={handlePickDate}
              disabledDate={disabledDate}
            ></DatePicker>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default OrdersAll;
