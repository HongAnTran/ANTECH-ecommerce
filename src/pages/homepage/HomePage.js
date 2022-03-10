import React from "react";
import Carousel from "../../features/silder.js/Carousel";
import DealHot from "../../features/deal-hot/DealHot";
import ProductTrend from "../../features/ProductTrend/ProductTrend";
import Banner from "../../components/banner/Banner";
import Navigation from "../../features/navigation/Navigation";
import ShowProduct from "../../features/show-product/ShowProduct";
import Footer from "../../components/footer/Footer";
import { BackTop } from "antd";
const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#fd7e14",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
  zIndex:100,
};
function HomePage() {
  return (
    <div>
  
      <Navigation />
      <Carousel />
      <DealHot />
      <ProductTrend />
      <Banner
        img={{
          image1:
            "https://cdn.tgdd.vn/2021/12/banner/samsung-390-210-390x210.png",
          image2: "https://cdn.tgdd.vn/2021/10/banner/appleDT-390x210-1.png",
          image3: "https://cdn.tgdd.vn/2021/12/banner/Laptopver2-390x210-1.png",
        }}
        title="CHUYÊN TRANG THƯƠNG HIỆU"
      />
      <Banner
        img={{
          image1:
            "https://cdn.tgdd.vn/2021/11/banner/Giadu%CC%A3ng-desktop-780x420-2.jpg",
          image2: "https://cdn.tgdd.vn/2021/12/banner/airpod-780x420-1.jpg",
          image3:
            "https://cdn.tgdd.vn/2021/12/banner/Giadu%CC%A3ng-desktop-780x420.jpg",
        }}
        title="SẢN PHẨM MỚI"
      />
      <ShowProduct />
      <Footer />
      <BackTop >
        <div  style={style}>Up</div>
      </BackTop>
    </div>
  );
}

export default HomePage;
