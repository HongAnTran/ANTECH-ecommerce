import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";
import "./carousel.scss"
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper";

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard,Autoplay]);
function Carousel() {
  return (
    <div className="carousel-container section">
    <div className="container ">
      <div className="row">
        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8">
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
          
        }}
        navigation={true}
        grabCursor={true} 
        autoplay={{
          "delay": 5000,
          "disableOnInteraction": false, 
          "pauseOnMouseEnter": true,
        }}
        className="mySwiper"
      >
        <SwiperSlide><img  className="carousel-img" src="//cdn.tgdd.vn/2021/11/banner/dhtt-830-300-830x300.png" alt=''></img></SwiperSlide>
        <SwiperSlide><img className="carousel-img" src="https://cdn.tgdd.vn/2021/12/banner/830-300-830x300-10.png" alt=''></img></SwiperSlide>
        <SwiperSlide><img className="carousel-img" src="https://cdn.tgdd.vn/2021/12/banner/830-300-830x300-8.png" alt=''></img></SwiperSlide>
        <SwiperSlide><img className="carousel-img" src="https://cdn.tgdd.vn/2021/12/banner/Aseri-830-300-830x300-2.png" alt=''></img></SwiperSlide>
        <SwiperSlide><img className="carousel-img"src="https://cdn.tgdd.vn/2021/12/banner/830-300-830x300-11.png" alt=''></img></SwiperSlide>
        <SwiperSlide><img className="carousel-img"src="https://cdn.tgdd.vn/2021/12/banner/830-300-830x300-12.png" alt=''></img></SwiperSlide>
 
      </Swiper>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
            <div className="banner-grid">
                    <div className="banner-item " >
                      <img src="https://cdn.tgdd.vn/2021/11/banner/laptopdesk(3)-340x340.jpg" alt="" ></img>
                    </div>
            </div>
          
        </div>

      </div>
      </div>
    </div>
  );
}

export default Carousel;
