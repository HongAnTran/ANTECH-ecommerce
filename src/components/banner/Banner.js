import React from 'react'
import './banner.scss'




function Banner({img,title}) {

   
     return (
     
        <div className="banner section" >
          <div className="container">
              <div className="banner-container"> 
              <div className="banner-title">
                    <h1>{title}</h1>
              </div>
            <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="banner-img" >

                    <img  src={img.image1} alt="">

                    </img>
                    </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                <div className="banner-img" >
                <img  src={img.image2} alt=""></img>
                </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                <div className="banner-img" >
                <img  src={img.image3} alt=""></img>
                </div>
                </div>  
            </div>
           </div>          
        </div>
        </div>
      
    )
}

export default Banner
