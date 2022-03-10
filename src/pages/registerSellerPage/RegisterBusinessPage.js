import React from 'react'
import logo from '../../assets/image/antech.png'
import FormRes from './FormRes'
import './register.scss'

function RegisterBusinessPage({setStep}) {
    return (
        <div className="register-business">
                <div className="register-business_container "> 
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            <div className="register-business_title">
                         <h1>Đăng ký bán hàng cùng</h1>
                         <img src={logo} alt="" className="logo-register"></img>
                        </div>
                            </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            <div className="register-from_container">
                        <h1>Điền thêm thông tin để bắt đầu bán hàng</h1>
                            <FormRes onSetStep={setStep}/>
                            </div>
                         </div>
                    </div>
                </div>  
       

        </div>
    )
}

export default RegisterBusinessPage
