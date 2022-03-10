import React,{ useState } from 'react'
import { Modal} from 'antd'
import "./modalSlider.scss"
function ModalSliderImgProduct({setVisibleModalSlider,visibleModalSlider,listImg , imgMain,nameProduct}) {

  const [indexImgMain,setIndexImgMain] = useState(null)

  const handleClickImg = (index) => {
    console.log(listImg)
    console.log(index)
    setIndexImgMain(index)
  }

  return (
    <>
   <Modal
    footer={null}
    centered
    visible={visibleModalSlider}
    onCancel={() => {

      setVisibleModalSlider(false)
      setIndexImgMain(null)
    }}
    closable={false}
    width={800}
    >
    

    <div className="container">
      <div className="row">
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8">
            <div className="modal-slider_left">
                  <div className="modal-slider_img">
                     <img src={indexImgMain !== null ? listImg[indexImgMain]?.path : listImg[imgMain]?.path} alt="img"/>
                  </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
            <div className="modal-slider_right">
                <div className="modal-slider_name">
                    <span >
                   {nameProduct}
                    </span>
                  </div>
                  <div className="modal-slider_list">
                 
                    {listImg.map((item,index) =>{

                      return (
                        
                        <div className={` modal-slider_item  ${indexImgMain !== null ? `${index === indexImgMain ? 'active' : ''}` :  `${index === imgMain ? 'active' : ''}`} `}
                          key={index}
                          onClick={() =>handleClickImg(index)}
                        >

                        <img src={item.path} alt="img"/>
                        </div>
                      )
                    })}
                </div>
                   
                 
              </div>
              
             </div>
        </div>
     </div>
     
   </Modal>
     </>
  )
}

export default ModalSliderImgProduct