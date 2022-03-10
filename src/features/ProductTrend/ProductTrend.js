import React, { useEffect } from "react";
import Card from "../../components/card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ProductTrend.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useSelector } from "react-redux"
// import Swiper core and required modules
import SwiperCore, { Navigation, Mousewheel } from "swiper";
import { productsSelector } from "../../redux/selector";

// install Swiper modules
SwiperCore.use([Navigation, Mousewheel]);
function ProductTrend() {
  const products = useSelector(productsSelector);
    const animationItem = () => {
        const imgBanner = document.querySelector(".img-banner");
        const items = document.querySelectorAll(".animation-card")
        if (window.scrollY >= 140) {
            imgBanner.classList.add("active");
          }
            
          if(window.scrollY >=310){
                items.forEach((item) => {
                    item.style.display = "block"
                })
          }
    }
  useEffect(() => {

    document.addEventListener("scroll", animationItem)
    return () => {
      document.removeEventListener("scroll", animationItem)
    }
  }, []);

  return (
    <>
      <div className="container section">
        <img
          src="https://cdn.tgdd.vn/2021/10/banner/1200-44-1200x44-3.png"
          className="img-banner"
          alt=""
        ></img>
      </div>
      <div className="trend-hot section">
        <div className="container ">
          <div className="trend-container">
            <div className="trend-hot-header">
              <div className="trend-title">
                <h1>Tìm kiếm hàng đầu</h1>
              </div>
            </div>
            <div className="row  gx-0">
              <Swiper
                slidesPerView={6}
                spaceBetween={0}
                slidesPerGroup={6}
                allowTouchMove={false}
                navigation={true}
                className="mySwiper"
                style={{ textAlign: "left" }}
              >

             {products.map(product =>{
               return (
                <SwiperSlide key={product._id}>
                <div className="animation-card ">
                  <Card  productId={product.productId}  discount={10} name={product.name} price={product.price} img={product.images[0].path} sold={product.sold} priceMin={product.priceMin}/>
                </div>
              </SwiperSlide>
               )
             })}

     
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductTrend;
