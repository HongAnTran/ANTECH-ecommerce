import React,{ memo } from "react";
import "./footer.scss";
import  { FacebookOutlined ,LinkedinOutlined ,InstagramOutlined} from "@ant-design/icons"

function Footer() {
  return (
    <footer className="footer section"
    >
      <div className="container">
        <div className="footer-container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="footer-col">
                <div className="footer-title">
                  <h3>Hỗ trợ khách hàng</h3>
                </div>
                <div className="footer-content">
                  <ul className="footer-list">
                    <li className="footer-item">
                      <span>
                        Hotline: 1900-6035 <br></br>(1000 đ/phút, 8-21h kể cả
                        T7, CN)
                      </span>
                    </li>
                    <li className="footer-item">
                      <span>Các câu hỏi thường gặp</span>
                    </li>
                    <li className="footer-item">
                      <span>Hướng dẫn đặt hàng</span>
                    </li>
                    <li className="footer-item">
                      <span>Chính sách đổi trả</span>
                    </li>
                    <li className="footer-item">
                      <span>Hướng dẫn trả góp</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="footer-col">
                <div className="footer-title">
                  <h3>Về ANTECH</h3>
                </div>
                <div className="footer-content">
                  <ul className="footer-list">
                    <li className="footer-item">
                      <span>Giới thiệu ANTECH</span>
                    </li>
                    <li className="footer-item">
                      <span>Tuyển dụng</span>
                    </li>
                    <li className="footer-item">
                      <span>Chính sách bảo mật thanh toán</span>
                    </li>
                    <li className="footer-item">
                      <span>Chính sách bảo mật thông tin cá nhân</span>
                    </li>
                    <li className="footer-item">
                      <span>Chính sách giải quyết khiếu nại</span>
                    </li>
                    <li className="footer-item">
                      <span>Điều khoản sử dụng</span>
                    </li>
                    <li className="footer-item">
                      <span>Bán hàng doanh nghiệp</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="footer-col">
                <div className="footer-title">
                  <h3>Phương thức thanh toán</h3>
                </div>
                <div className="footer-content">
                  <div className="footer-pay">
                    <div className="footer-visa footer-backgroundIcon"></div>
                    <div className="footer-master-card footer-backgroundIcon"></div>
                    <div className="footer-jcb footer-backgroundIcon"></div>
                    <div className="footer-cod footer-backgroundIcon"></div>
                  </div>
                  <div className="footer-pay">
                    <div className="footer-amex footer-backgroundIcon"></div>
                    <div className="footer-paygop footer-backgroundIcon"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="footer-col">
                <div className="footer-title">
                  <h3>Kết nối với chúng tôi</h3>
                </div>
                <div className="footer-content">
                            <div className="footer-connect">
                                <div className="footer-social">
                                    <a href="http://facebook.com/anhong0175" className="footer-social_link" >
                                    <FacebookOutlined style={{marginRight:8}}/>
                                        facebook
                                    </a>
                                </div>
                                <div className="footer-social">
                                    <a href=" # " className="footer-social_link">
                                    <LinkedinOutlined style={{marginRight:8}}/>
                                        LinkedIn
                                    </a>
                                </div>
                                <div className="footer-social">
                                    <a href=" #" className="footer-social_link">
                                    <InstagramOutlined style={{marginRight:8}}/>
                                        Instagram
                                    </a>
                                </div>
                            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
