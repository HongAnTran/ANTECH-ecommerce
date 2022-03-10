import React from "react";
import { Form, Input, Radio , DatePicker,Button } from "antd";
import { Link } from "react-router-dom";
import moment from 'moment';
import "./profile.scss";



const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
  
};

const dateFormat = 'YYYY/MM/DD';
function Profile() {

  function disabledDate(current) {
    // Can not select days before today and today

    return current && current > moment().endOf('day');
  }
  

  return (
    <div className="profile-customer">
      <div className="customer-container">
        <div className="profile-header">
          <h2>Hồ Sơ Của Tôi</h2>
          <div>
            <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
          </div>
        </div>
        <div className="profile-content">
          <div className="profile-content_left">
            <Form name="profile" {...layout}>
              <Form.Item name="username" label="Tên Đăng Nhập">
                <div>
                  <span>hong an</span>
                </div>
              </Form.Item>

              <Form.Item
                name="name"
                label="Tên"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên ",
                  },
                  {
                    whitespace: true,
                    message: "Tên không được chứa toàn kí tự khoảng trắng",
                  },
                ]}
              >
                <Input placeholder="Tên" />
              </Form.Item>
              <Form.Item name="Email" label="Email">
                <div>
                  <span>tr************@gmail.com</span>
                  <Link to="#">Thay đổi</Link>
                </div>
              </Form.Item>
              <Form.Item name="phoneNumber" label="Số Điện Thoại">
                <div>
                  <span>*********13</span>
                  <Link to="#">Thay đổi</Link>
                </div>
              </Form.Item>

              <Form.Item
                name="name"
                label="Tên Shop"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên Shop",
                  },
                  {
                    whitespace: true,
                    message: "Tên Shop không được chứa toàn kí tự khoảng trắng",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="sex" label="Giới Tính">
                <Radio.Group  defaultValue='male'>
                  <Radio value="male">Nam</Radio>
                  <Radio value="female">Nữ</Radio>
                  <Radio value="other">Khác</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="birthDay" label="Ngày Sinh">
              <DatePicker  format={dateFormat} 
                disabledDate={disabledDate}
               
              />
              </Form.Item>
              <Form.Item >
                <Button 
                type="primary"
                htmlType="submit"
                className="login-form-button"
                >
                    Sửa
                </Button >
              </Form.Item>
              
            </Form>
          </div>

          <div className="profile-content_right"></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
