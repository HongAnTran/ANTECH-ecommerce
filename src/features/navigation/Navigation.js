import React,{memo} from 'react'
import { Menu } from 'antd';


const url = 'http://localhost:3000/'
function Navigation() {
    return (
        <div className="navigation-home " 
               style={window.location.href ===url ? {marginTop:100} : {}}
        >
                    <div className="container">
       
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
                        <Menu.Item key="0" style={{color: 'white'}}>Home</Menu.Item>
                        <Menu.Item key="1" style={{color: 'white'}}>Điện Thoại</Menu.Item>
                        <Menu.Item key="2" style={{color: 'white'}}>Laptop</Menu.Item>
                        <Menu.Item key="3" style={{color: 'white'}}>Tablet</Menu.Item>
                        <Menu.Item key="4" style={{color: 'white'}}>Phụ Kiện</Menu.Item>
                        <Menu.Item key="5" style={{color: 'white'}}>Đồng hồ thông minh</Menu.Item>
                        <Menu.Item key="6" style={{color: 'white'}}>PC</Menu.Item>
                        <Menu.Item key="7" style={{color: 'white'}}>Máy in</Menu.Item>
                        <Menu.Item key="8" style={{color: 'white'}}>Bàn Phím cơ</Menu.Item>
                        <Menu.Item key="9" style={{color: 'white'}}>Màn hình</Menu.Item>
                        <Menu.Item key="10" style={{color: 'white'}}>Máy cũ giá rẻ</Menu.Item>
                        <Menu.Item key="11" style={{color: 'white'}}>Sim thẻ Cào</Menu.Item>
                        <Menu.Item key="12" style={{color: 'white'}}>Trả Góp</Menu.Item>
                  </Menu>
        
                        </div>    
        </div>
    )
}

export default memo(Navigation) 
