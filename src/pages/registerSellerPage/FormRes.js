import React from "react";
import { Form, Input, Select, Checkbox, Button, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { currentUserSelector } from "../../redux/selector";
import currentUserSlice from "../../features/modals/currentUserSlice";

const { Option } = Select;
function FormRes({ onSetStep }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const curentUser = useSelector(currentUserSelector);
  const onFinish = async (values) => {
    const { country, phoneNumber, shopName, address, itemsMain } = values;
    try {
      dispatch(
        currentUserSlice.actions.editUserRequest({
          ...curentUser,
          country,
          phoneShop:phoneNumber,
          shopName,
          deliveryAddress:address,
          itemsMain,
          isSeller: true,
        })
      );
      onSetStep(1);
      form.resetFields();
    } catch (error) {
      notification["error"] = {
        message: error.message,
      };
    }
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
        <Option value="86">+86</Option>
        <Option value="886">+886</Option>
        <Option value="65">+65</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div>
      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          prefix: "84",
        }}
        scrollToFirstError
      >
        <Form.Item
          key="0"
          name="shopName"
          label="Tên cửa hàng"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên cửa hàng.",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Tên cửa hàng" />
        </Form.Item>

        <Form.Item
          key="1"
          name="phoneNumber"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
            },
            {
              min: 8,
              message: "SĐT phải chứa ít nhất 8 chữ số.",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            placeholder="Nhập số điện thoại"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          key="2"
          name="address"
          label="Địa chỉ lấy hàng"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ lấy hàng",
            },
          ]}
        >
          <Input
            placeholder="Nhập địa chỉ lấy hàng"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          key="3"
          name="itemsMain"
          label="Chọn ngành mặt hàng chính cửa hàng sẽ bán"
          tooltip="Việc chọn đúng danh mục sẽ giúp Bộ phận hỗ trợ đối tác điều phối nhân viên có chuyên môn về ngành hàng để hỗ trợ Quý nhà bán trong tương lai."
          rules={[
            {
              required: true,
              message: "Vui lòng chọn mặt hàng chính",
            },
          ]}
        >
          <Select placeholder="Chọn mặt hàng chính">
            <Option value="Điện thoại">Điện thoại</Option>
            <Option value="laptop">LapTop</Option>
            <Option value="Máy tính bàn">Máy tính bàn</Option>
            <Option value="Phụ kiện công nghệ">Phụ kiện công nghệ</Option>
            <Option value="Tablet">Tablet</Option>
            <Option value="Đồng hồ thông minh">Đồng hồ thông minh</Option>
            <Option value="Hàng cũ">Hàng cũ</Option>
          </Select>
        </Form.Item>
        <Form.Item
          key="4 "
          name="country"
          label="Quốc gia"
          tooltip="Quốc gia nơi Nhà bán đăng ký kinh doanh và có kho hàng chính."
          rules={[
            {
              required: true,
              message: "Vui lòng chọn quốc gia",
            },
          ]}
        >
          <Select placeholder="Chọn quốc gia">
            <Option value="Việt Nam">Việt Nam</Option>
            <Option value="Chinna">Trung Quốc</Option>
            <Option value="TaiWan">Đài Loan</Option>
            <Option value="Singapore">Singapore</Option>
          </Select>
        </Form.Item>

        <Form.Item
          key="5"
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Bạn phải đồng ý với điều kiện của chúng tôi")
                    ),
            },
          ]}
        >
          <Checkbox>
            tôi đã đọc <a href=" # ">điều khoản</a> và đồng ý
          </Checkbox>
        </Form.Item>
        <Form.Item key="6">
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormRes;
