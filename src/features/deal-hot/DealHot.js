import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./dealhot.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import Swiper core and required modules
import SwiperCore, { Navigation, Mousewheel } from "swiper";
import CardDeal from "./CardDeal";

// install Swiper modules
SwiperCore.use([Navigation, Mousewheel]);

function DealHot() {
  const [timeHours, setTimeHours] = useState("0");
  const [timeMinutes, setTimeMinutes] = useState("0");
  const [timeSeconds, setTimeSeconds] = useState("0");
  const [timeDays, setTimeDays] = useState("0");

  let interval = useRef();
  const startTime = () => {
    const countdownTime = new Date("January 28, 2022 00:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownTime - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance <= 0) {
        clearInterval(interval);
      } else {
        setTimeDays(days);
        setTimeHours(hours);
        setTimeMinutes(minutes);
        setTimeSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTime();

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="deal-hot section">
      <div className="container ">
        <div className="deal-container">
          <div className="deal-hot-header">
            <div className="deal-hot-logo">
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/giasoc.svg"
                alt=""
              ></img>
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/dealFlashIcon.svg"
                className="deal-flash"
                alt=""
              ></img>
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/homnay.svg"
                alt=""
              ></img>
            </div>

            <div className="deal-hot-count">
              <div className="deal-count">
                <span>{` ${timeDays} day`}</span>
              </div>
              <span className="dot-time">-</span>

              <div className="deal-count">
                <span>{timeHours < 10 ? `0${timeHours}` : timeHours}</span>
              </div>
              <span className="dot-time">:</span>
              <div className="deal-count">
                <span>
                  {timeMinutes < 10 ? `0${timeMinutes}` : timeMinutes}
                </span>
              </div>
              <span className="dot-time">:</span>
              <div className="deal-count">
                <span>
                  {timeSeconds < 10 ? `0${timeSeconds}` : timeSeconds}
                </span>
              </div>
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
              <SwiperSlide>
                <CardDeal />
              </SwiperSlide>
              <SwiperSlide>
                <CardDeal />
              </SwiperSlide>
              <SwiperSlide>
                <CardDeal />
              </SwiperSlide>
              <SwiperSlide>
                <CardDeal />
              </SwiperSlide>
              <SwiperSlide>
                <CardDeal />
              </SwiperSlide>
              <SwiperSlide>
                <CardDeal />
              </SwiperSlide>
              <SwiperSlide>
                <CardDeal />
              </SwiperSlide>
              <SwiperSlide>
                <CardDeal />
              </SwiperSlide>
              <SwiperSlide>
                <CardDeal />
              </SwiperSlide>
              <SwiperSlide>
                <CardDeal />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealHot;
