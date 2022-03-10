import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as api from "../../../api/api";
import { auth } from "../../../firebase/index";
import { Form, Modal, Input, Button, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { modalSelector } from "../../../redux/selector";
import modalSlice from "../modalSlice";
import "../modal.scss";

function RegisterModal() {
  const dispatch = useDispatch();

  //state visible modal
  const isvisible = useSelector(modalSelector);
  const form = Form.useForm();

  //submit form success
  const onFinish = async ({ email, password, name }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid, providerId } = userCredential.user;

      await api.createUser({
        name,
        email,
        uid,
        providerId,
      });
      window.location.reload();
      console.log("dang ki success");
      handleCloseModal();
      notification["success"]({
        message: "Đăng kí tài khoản thành công",
      });
    } catch (error) {
      notification["error"]({
        message: "Tài khoản đã được đăng kí trước đó",
      });
    }
  };

  const handleCloseModal = () => {
    dispatch(modalSlice.actions.closeRegisterModal());
    form[0].resetFields();
  };
  const handleSwapModal = () => {
    dispatch(modalSlice.actions.swapModal());
    form[0].resetFields();
  };

  return (
    <Modal
      visible={isvisible.modalRegister}
      closable={false}
      title="Đăng Kí"
      footer={null}
      onCancel={handleCloseModal}
      style={{ backgroundColor: "#fd7e14" }}
    >
      <Form
        name="login"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        form={form[0]}
      >
        <Form.Item
          name="name"
          label="Họ và tên"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "vui lòng nhập email",
            },
            {
              type: "email",
              message: "Định dạng email không đúng",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "vui lòng nhập password",
            },
            {
              min: 6,
              message: "mật khẩu phải có ít nhất 6 kí tự",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập xác nhận mật khẩu",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("Mật khẩu bạn nhập lại không chính xác")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
             wrapperCol={{
              offset: 15,
              span: 16,
            }}
            style={{ flexDirection: "row", marginBottom: 22 ,marginTop:22}}
        
        >
          <Button onClick={handleSwapModal}>Đăng nhập</Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#fd7e14" }}
          >
            Đăng Kí
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default RegisterModal;
