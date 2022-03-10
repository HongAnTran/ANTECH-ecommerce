import React, { useState } from "react";
import RegisterBusinessPage from "./RegisterBusinessPage";
import { Steps } from "antd";
import "./sellpage.scss";
import RegisterComplete from "./RegisterComplete";
const { Step } = Steps;

function RegisterSellPage() {
  const [step, setStep] = useState(0);

  return (
    <div>
      <div className="container">
        <div className="sell-page_container">
          <div className="sell-page_header">
            <Steps current={step}>
              <Step title="Thông tin cửa hàng" />
              <Step title="Đăng bán sản phẩm" />
            </Steps>
          </div>
          <div className="sellPage-container">
            {step === 0 ? (
              <RegisterBusinessPage setStep={setStep} />
            ) : (
              <RegisterComplete />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterSellPage;
