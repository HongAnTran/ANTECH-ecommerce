import React from "react";
import { Checkbox } from "antd";
import "./shipping.scss";
import useLocationForm from "../../hook/useLocationForm";
import { useSelector, useDispatch } from "react-redux";
import { currentUserSelector } from "../../redux/selector";
import currentUserSlice from "../../features/modals/currentUserSlice";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Form, Input, Button } from "antd";


function FormShipping({
  setOpenForm,
  setOpenFormEdit,
  method,
  index,
  address,
}) 
{

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(currentUserSelector);
  const onFinish = (values) => {
    const {
      name,
      phoneNumber,
      city,
      distric,
      ward,
      addressDetail,
      putDefault,
    } = values;


    const addressString =
      addressDetail.trim() +
      "," +
      ward.label +
      "," +
      distric.label +
      "," +
      city.label;

    const addressItem = {
      name,
      phoneNumber,
      address: addressString,
      city,
      distric,
      ward,
      addressDetail,
    };
    let address = [...user.address];

    if (method === "POST") {
      putDefault || address.length === 0
        ? address.unshift(addressItem)
        : (address = [...user.address, addressItem]);
    } else if (method === "EDIT") {
      if (putDefault) {
        address.splice(index, 1);
        address.unshift(addressItem);
      } else {
        address.splice(index, 1, addressItem);
      }
    }

    dispatch(
      currentUserSlice.actions.editUserRequest({
        ...user,
        address,
      })
    );
    navigate("../payment");
  };
  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(false);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  const handleSwapForm = () => {
    if (method === "EDIT") {
      setOpenFormEdit(false);
    } else {
      setOpenForm(false);
    }
  };
  return (
    <div>
      <div className="shipping-form">
        <div className="form-container">
          <Form name="add-address" onFinish={onFinish}>
            <div className="form-item">
              <div className="form-lable">
                <span>Họ tên</span>
              </div>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên",
                  },
                ]}
                style={{ width: "67%" }}
                initialValue={method === "EDIT" ? address.name : user.name}
              >
                <Input placeholder="Nhập họ tên" />
              </Form.Item>
            </div>
            <div className="form-item">
              <div className="form-lable">
                <span>Điện thoại di động</span>
              </div>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại",
                  },

                  {
                    pattern:
                      /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/,
                    message: "số điện thoại định dang không đúng",
                  },
                ]}
                initialValue={
                  method === "EDIT" ? address.phoneNumber : user.phoneNumber
                }
                style={{ width: "67%" }}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </div>
            <div className="form-item">
              <div className="form-lable">
                <span>Tỉnh/Thành phố</span>
              </div>
              <Form.Item
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn tỉnh/thành phố",
                  },
                ]}
                style={{ width: "67%" }}
                initialValue={method === "EDIT" ? address.city : ""}
              >
                <Select
                  name="cityId"
                  key={`cityId_${selectedCity?.value}`}
                  isdisabled={cityOptions.length === 0 ? "true" : "false"}
                  options={cityOptions}
                  onChange={(options) => {
                    return onCitySelect(options);
                  }}
                  placeholder="Tỉnh/Thành"
                  initialvalues={selectedCity}
                />
              </Form.Item>
            </div>
            <div className="form-item">
              <div className="form-lable">
                <span>Quận/Huyện</span>
              </div>
              <Form.Item
                name="distric"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Quận/Huyện",
                  },
                ]}
                style={{ width: "67%" }}
                initialValue={method === "EDIT" ? address.distric : ""}
              >
                <Select
                  name="districtId"
                  key={`districtId_${selectedDistrict?.value}`}
                  isdisabled={districtOptions.length === 0 ? "true" : "false"}
                  options={districtOptions}
                  onChange={(option) => onDistrictSelect(option)}
                  placeholder="Quận/Huyện"
                  initialvalues={selectedDistrict}
                />
              </Form.Item>
            </div>
            <div className="form-item">
              <div className="form-lable">
                <span>Phường/Xã</span>
              </div>
              <Form.Item
                name="ward"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Phường/Xã",
                  },
                ]}
                style={{ width: "67%" }}
                initialValue={method === "EDIT" ? address.ward : ""}
              >
                <Select
                  name="wardId"
                  key={`wardId_${selectedWard?.value}`}
                  isdisabled={wardOptions.length === 0 ? "true" : "false"}
                  options={wardOptions}
                  placeholder="Phường/Xã"
                  onChange={(option) => onWardSelect(option)}
                  initialvalues={selectedWard}
                />
              </Form.Item>
            </div>
            <div className="form-item">
              <div className="form-lable">
                <span>Địa chỉ</span>
              </div>
              <Form.Item
                name="addressDetail"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn nhập địa chỉ ",
                  },
                  {
                    whitespace: true,
                    message: "không được để trống",
                  },
                ]}
                style={{ width: "67%" }}
                initialValue={method === "EDIT" ? address.addressDetail : ""}
              >
                <Input.TextArea placeholder="Ví dụ: 52 đường Trần Hưng Đạo"></Input.TextArea>
              </Form.Item>
            </div>
            <div className="form-item">
              <div className="form-lable"></div>
              <Form.Item name="putDefault" valuePropName="checked"
              initialValue={index === 0 }
              >
                <Checkbox>Đặt địa chỉ này làm mặc định</Checkbox>
              </Form.Item>
            </div>

            <div className="form-item">
              <div className="form-lable"></div>
              <Form.Item style={{ width: "67%" }}>
                <Button
                  style={{ marginRight: 10 }}
                  onClick={() => handleSwapForm()}
                >
                  Hủy bỏ
                </Button>
                <Button type="primary" htmlType="submit">
                  {method === "EDIT" ? "Cập nhập" : "Giao đến địa chỉ này"}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>

    </div>
  );
}

export default FormShipping;
