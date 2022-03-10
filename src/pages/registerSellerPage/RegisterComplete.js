import { Button } from 'antd'
import React from 'react'
import './register.scss'
import {Link } from 'react-router-dom'
function RegisterComplete() {



 
    return (
        <div className='register-complete_container'>
           
                <div >
                <img className='register-img_approve' src='https://deo.shopeesz.com/shopee/pap-admin-live-sg/upload/upload_1396437671da07b5825d85e6f0eb7916.png' alt=''></img>
                </div>
                <h1 className='register-complete_title'>Đăng kí thành công</h1>
               <div className='register-complete_sub'>
                   <span>Hãy đăng bán sản phẩm đầu tiên để khởi động hành trình bán hàng cùng ANTECH nhé!</span>
               </div>
               <Button type='primary'
              
               >
                   <Link to="/seller/products/list/all">

                   Thêm Sản phẩm
                   </Link>
                   
                   </Button>
        </div>
    )
}

export default RegisterComplete
