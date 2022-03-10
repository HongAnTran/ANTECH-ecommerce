import React from "react";
import { Form, Modal, Input, Button, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { modalSelector } from "../../../redux/selector";
import modalSlice from "../modalSlice";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookOutlined, GoogleCircleFilled } from "@ant-design/icons";
import { auth } from "../../../firebase/index";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import * as api from "../../../api/api";

const provider = new GoogleAuthProvider();
function LoginModal() {
  const dispatch = useDispatch();
  const isvisible = useSelector(modalSelector);
  const form = Form.useForm();
  const onFinish = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
       window.location.reload();
    } catch (error) {
      notification["error"]({
        message: "Mật khẩu hoặc email không đúng!",
      });
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, phoneNumber, photoURL, uid } = result.user;
      const tokenResponse = result._tokenResponse;
      const providerId = tokenResponse.providerId;

      if (tokenResponse?.isNewUser) {
        await api.createUser({
          name: displayName,
          email,
          phoneNumber,
          photoURL,
          uid,
          providerId,
        });
      }
      window.location.reload();
    } catch (err) {
      notification["error"]({
        message: "Không đăng nhập được bằng Email",
      });
    }
  };

  const handleCloseModal = () => {
    dispatch(modalSlice.actions.closeModalChange());
    form[0].resetFields();
  };

  const handleSwapModal = () => {
    dispatch(modalSlice.actions.swapModal());
    form[0].resetFields();
  };

  return (
    <Modal
      visible={isvisible.modalLogin}
      closable={false}
      title="Đăng Nhập"
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
          wrapperCol={{
            offset: 15,
            span: 16,
          }}
          style={{ flexDirection: "row", marginBottom: 22 ,marginTop:22}}
        >
          <Button onClick={handleSwapModal}>Đăng kí</Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#fd7e14" }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            icon={
              <FacebookOutlined
                style={{ fontSize: "22px", color: "#fd7e14" }}
              />
            }
            style={{marginLeft:32}}
          >
            Đăng nhập với Facebook
          </Button>
          <Button
            icon={
              <GoogleCircleFilled
                style={{ fontSize: "22px", color: "#fd7e14" }}
              />
            }
            onClick={handleLoginGoogle}
          >
            Đăng nhập với Google
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default LoginModal;
