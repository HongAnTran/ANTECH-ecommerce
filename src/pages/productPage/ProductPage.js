import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import productPageSlice from "./productPageSlice";
import cartUserSlice from "../../redux/sliceCommon/cartUserSlice";
import {
  currentUserSelector,
  productPageSelector,
  ShopSelector,
} from "../../redux/selector";
import { Button, Spin, Input, notification, message, Rate } from "antd";
import {
  RightOutlined,
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import "./productPage.scss";
import InfoShop from "./infoshop/InfoShop";
import InfoDetail from "./InfoDetail";
import Footer from "../../components/footer/Footer";
import InfoDescription from "./InfoDescription";
import formatCash, { convertPrice } from "../../hook/useFortmatCash";
import modalSlice from "../../features/modals/modalSlice";
import Rates from "./rating/Rates";
import billSlice from "../cartPage/billSlice";
import ModalSliderImgProduct from "./modalSlider/ModalSliderImgProduct";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
function ProductPage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, isLoadingProduct, rates } = useSelector(productPageSelector);
  const shop = useSelector(ShopSelector);
  const user = useSelector(currentUserSelector);
  const [path, setPath] = useState([]);
  const [quantilyOder, setQuantilyOder] = useState(1);
  const [imgMain, setImageMain] = useState(0);
  const [isActive, setIsActive] = useState();
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [quantily, setQuantily] = useState(product?.quantity);
  const [validDIs, setValidDIs] = useState("pending");

  const [onModalSlider,setOnModalSlider ] = useState(false);

  useEffect(() => {
    dispatch(productPageSlice.actions.getProductRequest(params.productId));
  }, [dispatch, params]);

  useEffect(() => {
    if (product?.images) {
      setPath(product.images);
    }

    if (product?.price) {
      setPrice(formatCash(product.price));
    } else if (product?.priceMin) {
      setPrice(
        `${formatCash(product?.priceMin)} - ₫${formatCash(product?.priceMax)}`
      );
    }

    setQuantily(product?.quantily);
  }, [product, setPath]);

  useEffect(() => {
    if (product?.uid) {
      dispatch(productPageSlice.actions.getShopRequest(product?.uid));
    }
  }, [dispatch, product.uid]);

  useEffect(() => {
    if (product?.productId) {
      dispatch(productPageSlice.actions.getRatesRequest(product.productId));
    }
  }, [product.productId, dispatch]);

  useEffect(() => {
    if (!type) {
      setQuantily(product.quantily);
    } else {
      const indexDistribute = product.distributeProduct.findIndex(
        (dis) => dis.distributeProductName === type
      );
      setQuantily(
        product.distributeProduct[indexDistribute].distributeProductQuantily
      );
    }
  }, [product]);
  const handlerQuantityOderIncrease = () => {
    if (quantilyOder < quantily) {
      setQuantilyOder(quantilyOder + 1);
    }
  };

  const handlerQuantityOderDecrease = () => {
    if (quantilyOder > 1) {
      setQuantilyOder(quantilyOder - 1);
    }
  };

  const handlerQuantityOderChange = (e) => {
    const value = e.target.value;
    if (Number(value) <= quantily && Number(value) >= 1) {
      setQuantilyOder(Number(value));
    } else if (value === "") {
      setQuantilyOder(1);
    } else {
      setQuantilyOder(quantily);
    }
  };

  const handleClickImg = (index) => {
    setImageMain(index);
  };

  const handleDistributeProduct = (dis, index) => {
    setPrice(formatCash(dis.distributeProductPrice));
    setQuantilyOder(1);
    setQuantily(dis.distributeProductQuantily);
    setType(dis.distributeProductName);
    setValidDIs("valid");
    const distributeProductImage = path.find(
      (a) => a.index === dis.distributeProductImage
    );
    if (distributeProductImage) {
      setImageMain(path.indexOf(distributeProductImage));
    }

    setIsActive(index);
  };

  const handlerAddCart = () => {
    if (!user.name) {
      dispatch(modalSlice.actions.onModalChange());
      return;
    }

    if (user.uid === product.uid) {
      notification["error"]({
        message: "bạn không thể thêm sản phẩm của chính bạn",
        top: 100,
      });

      return;
    }

    if (product.distributeProduct.length > 0) {
      if (validDIs === "valid") {
        dispatch(
          cartUserSlice.actions.addProductToCartRequest({
            shopName: shop.shopName,
            uid: user.uid,
            seller: shop.uid,
            products: [
              {
                seller: shop.uid,
                productId: product.productId,
                nameProduct: product.name,
                priceProduct: convertPrice(price),
                quantilyOder,
                imageProduct: product.images[imgMain].path,
                type,
                quantily,
                shopName: shop.shopName,
              },
            ],
          })
        );

        message.success("Thêm sản phẩm thành công");

        window.scrollTo(0, 0);
      } else {
        setValidDIs("error");
      }
      return;
    }

    dispatch(
      cartUserSlice.actions.addProductToCartRequest({
        shopName: shop.shopName,
        uid: user.uid,
        seller: shop.uid,
        products: [
          {
            seller: shop.uid,
            productId: product.productId,
            nameProduct: product.name,
            priceProduct: convertPrice(price),
            quantilyOder,
            imageProduct: product.images[0].path,
            quantily: quantily,
            shopName: shop.shopName,
          },
        ],
      })
    );

    window.scrollTo(0, 0);

    message.success("Thêm sản phẩm thành công");
  };

  const handleBuyNow = () => {
    if (!user.name) {
      dispatch(modalSlice.actions.onModalChange());
      return;
    }

    if (user.uid === product.uid) {
      notification["error"]({
        message: "bạn không thể thêm sản phẩm của chính bạn",
        top: 100,
      });

      return;
    }

    if (product.distributeProduct.length > 0) {
      if (validDIs === "valid") {
        dispatch(
          cartUserSlice.actions.addProductToCartRequest({
            shopName: shop.shopName,
            uid: user.uid,
            seller: shop.uid,
            products: [
              {
                seller: shop.uid,
                productId: product.productId,
                nameProduct: product.name,
                priceProduct: convertPrice(price),
                quantilyOder,
                imageProduct: product.images[imgMain].path,
                type,
                quantily,
                shopName: shop.shopName,
              },
            ],
          })
        );

        dispatch(
          billSlice.actions.handleBillAddRequest({
            uid: user.uid,
            products: {
              imageProduct: path[imgMain]?.path,
              priceProduct: convertPrice(price),
              nameProduct: product.name,
              intoMoney: convertPrice(price) * quantilyOder,
              productId: product.productId,
              quantily: 12,
              quantilyOder: 2,
              seller: shop.uid,
              shopName: shop.shopName,
              type: type ? type : null,
            },
          })
        );
      }
    } else {
      dispatch(
        cartUserSlice.actions.addProductToCartRequest({
          shopName: shop.shopName,
          uid: user.uid,
          seller: shop.uid,
          products: [
            {
              seller: shop.uid,
              productId: product.productId,
              nameProduct: product.name,
              priceProduct: convertPrice(price),
              quantilyOder,
              imageProduct: product.images[imgMain].path,
              quantily,
              shopName: shop.shopName,
            },
          ],
        })
      );

      dispatch(
        billSlice.actions.handleBillAddRequest({
          uid: user.uid,
          products: {
            imageProduct: path[imgMain]?.path,
            priceProduct: convertPrice(price),
            nameProduct: product.name,
            intoMoney: convertPrice(price) * quantilyOder,
            productId: product.productId,
            quantily: 12,
            quantilyOder: 2,
            seller: shop.uid,
            shopName: shop.shopName,
          },
        })
      );
    }

    navigate("/checkout/cart");
  };

  const scrollToRate = () => {
    const rateSection = document.querySelector(".rates");

    if (rateSection) {
      window.scrollTo(0, rateSection.offsetTop);
    }
  };

  const handleLikeProduct = () => {
    if (!user.name) {
      dispatch(modalSlice.actions.onModalChange());
      return;
    }

    dispatch(
      productPageSlice.actions.likeProductRequest({
        uid: user.uid,
        productId: product.productId,
      })
    );
  };
  return (
    <div className="product-container">
      <div className="container">
        {isLoadingProduct ? (
          <Spin />
        ) : (
          <>
            <div className="product-header">
              <Link to="/" className="product-header_antech">
                ANTECH
              </Link>
              <RightOutlined />
              <span className="product-header_item">{product?.items}</span>
              <RightOutlined />
              <span className="product-header_item">{product?.name}</span>
            </div>
            <div className="product-content">
              <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
                  <div className="product-image">
                    <div className="product-image_main"
                      onClick={() => setOnModalSlider(true)}
                    >
                      <img src={path[imgMain]?.path} alt=""></img>
                    </div>
                    <div className="product-image_list">
                      <Swiper
                        slidesPerView={5}
                        spaceBetween={0}
                        slidesPerGroup={5}
                        navigation={true}
                        modules={[ Navigation]}
                        className="mySwiper"
                      >
                       
                        {path.map((image, index) => (
                       
                          <SwiperSlide
                                 className={`product-image_item ${
                                  index === imgMain ? "active" : ""
                                }`}
                                key={image.index}
                                onClick={() => handleClickImg(index)}
                          >
                          {" "}
                          <img
                            src={image.path}
                            alt=""
                          ></img>
                        </SwiperSlide>
                     
                      ))}
                      </Swiper>
                    </div>
                    <div className="product-image_bottom">
                      <div className="product-image_share">
                        <span className="Rs4O3p">Chia sẻ:</span>
                        <button className="product-image_sharing product-image_sharing-fb btn-share"></button>
                        <button className="product-image_sharing product-image_sharing-mess btn-share"></button>
                        <button className="product-image_sharing product-image_sharing-twitter btn-share"></button>
                        <button className="product-image_sharing  product-image_sharing-pinter btn-share"></button>
                      </div>
                      <div
                        className="product-image_like"
                        onClick={handleLikeProduct}
                        style={{ cursor: "pointer", userSelect: "none" }}
                      >
                        <div>
                          {product?.listLikeProduct?.includes(user.uid) ? (
                            <HeartFilled
                              style={{
                                color: "#d0011b",
                                fontSize: "20px",
                                marginRight: "8px",
                                cursor: "pointer",
                              }}
                            />
                          ) : (
                            <HeartOutlined
                              style={{
                                color: "#d0011b",
                                fontSize: "20px",
                                marginRight: "8px",
                                cursor: "pointer",
                              }}
                            />
                          )}
                        </div>
                        <span className="Rs4O3p">
                          Đã thích ({product?.listLikeProduct?.length})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
                  <div className="product-info">
                    <div className="product-info_header">
                      <h1>{product?.name}</h1>
                      <div className="product-info_header-sold">
                        {product?.rateStar?.length > 0 ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                            onClick={scrollToRate}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                paddingRight: "10px",
                                borderRight: "1px solid rgba(0,0,0,.14)",
                              }}
                            >
                              <span className="product-index_rate">
                                {product?.averageStar}
                              </span>
                              <Rate
                                value={product?.averageStar}
                                allowHalf
                                style={{ fontSize: "16px" }}
                                disabled
                              />
                            </div>
                            <div
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                borderRight: "1px solid rgba(0,0,0,.14)",
                              }}
                            >
                              <span>{`${product?.rateStar?.length} đánh giá`}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="product-info_rate">
                            Chưa Có Đánh Giá
                          </span>
                        )}
                        <div className="product-info_sold">{`Đã bán ${product?.sold}`}</div>
                      </div>
                    </div>
                    <div className="product-info_price">
                      <div className="product-info_price_text">
                        {`₫${price}`}
                      </div>
                      <img
                        style={{ height: 30, width: 130 }}
                        src="https://salt.tikicdn.com/ts/upload/2e/da/c9/4b9c0150392c753ccb65b2595500e9d6.png"
                        alt=""
                      ></img>
                    </div>
                    <div className="product-info_transport">
                      <span style={{ fontSize: "16px", marginRight: 12 }}>
                        Giao đến :
                      </span>
                      <span>
                        {/* {address} */}
                        {user?.address?.length > 0 ? (
                          <>
                            <span
                              style={{
                                marginRight: 12,
                                fontSize: "16px",
                                color: "#000",
                                textDecoration: "underline",
                              }}
                            >
                              {user.address[0].address}
                            </span>
                            <Link to="/">Đổi địa chỉ</Link>
                          </>
                        ) : (
                          <span>Cập nhập địa chỉ giao hàng</span>
                        )}
                      </span>
                    </div>
                    <div className="product-info_distribute">
                      {product?.nameGroupProduct ? (
                        <>
                          <div
                            className=""
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: 12,
                            }}
                          >
                            <span style={{ fontSize: "16px", marginRight: 12 }}>
                              {product.nameGroupProduct} :
                            </span>
                            <div>
                              {product.distributeProduct.map((dis, index) => (
                                <Button
                                  key={index}
                                  style={{ marginLeft: 8 }}
                                  onClick={() =>
                                    handleDistributeProduct(dis, index)
                                  }
                                  className={
                                    index === isActive ? "btn-dis_active" : " "
                                  }
                                >
                                  {dis.distributeProductName}
                                </Button>
                              ))}
                            </div>
                          </div>
                          {validDIs === "valid" || validDIs === "pending" ? (
                            ""
                          ) : (
                            <span
                              style={{
                                fontSize: "16px",
                                color: "red",
                                display: "block",
                                marginTop: 12,
                                backgroundColor: "#fff5f5",
                              }}
                            >
                              Vui lòng chọn phân loại hàng
                            </span>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="product-info_quantily">
                      <span>Số Lượng :</span>
                      <div className="product-info_quantily-btn">
                        <Button onClick={handlerQuantityOderDecrease}>
                          <MinusOutlined />
                        </Button>
                        <Input
                          value={quantilyOder}
                          onChange={handlerQuantityOderChange}
                          className="product-info_quantily-input"
                        />
                        <Button
                          style={{ display: "flex", alignItems: "center" }}
                          onClick={handlerQuantityOderIncrease}
                        >
                          <PlusOutlined />
                        </Button>
                        <span style={{ marginLeft: 12 }}>
                          {`${quantily} Sản phẩm có sẵn`}
                        </span>
                      </div>
                    </div>
                    <div className="product-info_btn">
                      <button
                        className="product-info_add "
                        onClick={handlerAddCart}
                      >
                        <ShoppingCartOutlined
                          style={{ fontSize: 20, marginRight: 4 }}
                        />
                        Thêm Vào Giỏ Hàng
                      </button>
                      <button
                        className="product-info_buy"
                        onClick={handleBuyNow}
                      >
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <InfoShop shopName={shop?.shopName} avtShop={shop?.photoURL} />
            <InfoDetail
              items={product?.items}
              origin={product?.origin}
              insurence={product?.insurence}
              status={product?.status}
              brand={product?.brand}
              from={shop?.deliveryAddress}
            />
            <InfoDescription description={product?.description} />
            <Rates
              rates={rates}
              totalStar={product?.averageStar}
              productId={product?.productId}
            />
          </>
        )}
      </div>
      <Footer />

      <ModalSliderImgProduct  setVisibleModalSlider={setOnModalSlider} 
      visibleModalSlider={onModalSlider} listImg={path} imgMain={imgMain}
      nameProduct={product?.name}
      />
    </div>
  );
}

export default ProductPage;
