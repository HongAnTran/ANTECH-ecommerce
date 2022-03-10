import React, { useState ,useEffect } from "react";
import { Button, Input } from "antd";
import "./productsadd.scss";
import { TreeSelect, notification, Select } from "antd";
import UpImage from "../../../components/upImage/UpImage";
import { useSelector, useDispatch } from "react-redux";
import { currentUserSelector, imagesSelector } from "../../../redux/selector";
import { v4 as uuidv4 } from "uuid";
import * as api from "../../../api/api";
import upImageSlice from "../../../components/upImage/upImageSlice";
import { useNavigate } from "react-router-dom";
import ProductsDistribute from "./ProductsDistribute";
import { Form } from "antd";

const { Option } = Select;
const treeData = [
  {
    title: "ĐIện thoại & Phụ kiện",
    value: "Điện thoại & phụ kiện",
    children: [
      { title: "Thẻ sim", value: "Thẻ sim" },
      { title: "Điện thoại", value: "Điện thoại" },
      {
        title: "Phụ kiện",
        value: "Phụ kiện",

        children: [
          { title: "Ống kính điện thoại", value: "Ống kính điện thoại" },
          { title: "Thẻ nhớ", value: "Thẻ nhớ" },
          { title: "Sạc dự phòng", value: "Sạc dự phòng" },
          { title: "Pin", value: "Pin" },
          {
            title: "Vỏ bao,ốp lưng & miếng dán",
            value: "Vỏ bao,ốp lưng & miếng dán",
          },
          { title: "Khác", value: "Khác" },
        ],
      },
    ],
  },

  { title: "Đồng hồ thông minh", value: "Đồng hồ thông minh" },
  {
    title: "Thiết bị điện gia dụng",
    value: "Thiết bị điện gia dụng",
    children: [
      {
        title: "Tivi",
        value: "Tivi",
      },
      {
        title: "Máy chiếu",
        value: "Máy chiếu",
      },
    ],
  },
  {
    title: "Thiết bị âm thanh",
    value: "Thiết bị âm thanh",
    children: [
      {
        title: "Tai nghe",
        value: "Tai nghe",
      },
      {
        title: "Máy nghe nhạc",
        value: "Máy nghe nhạc",
      },
    ],
  },
  {
    title: "Gaming",
    value: "Gaming",
    children: [
      {
        title: "Máy chơi game",
        value: "Máy chơi game",
      },
    ],
  },
  {
    title: "Tablet",
    value: "Tablet",
  },
  {
    title: "Máy tính & Laptop",
    value: "Máy tính & Laptop",
    children: [
      {
        title: "Laptop",
        value: "Laptop",
      },
      {
        title: "Máy tính bàn",
        value: "Máy tính bàn",
      },
      {
        title: "Màn hình",
        value: "Màn hình",
      },
      {
        title: "Linh kiện máy tính",
        value: "Linh kiện máy tính",
      },
      {
        title: "Thiết bị lưu trữ",
        value: "Thiết bị lưu trữ",
      },
      {
        title: "Chuột & bàn phím",
        value: "Chuột & bàn phím",
      },
    ],
  },
];


const { TextArea } = Input;
function ProductsAdd() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listImgSetUp = useSelector(imagesSelector);

  const { uid } = useSelector(currentUserSelector);

  const [numberText, setNumberText] = useState(0);

  const [isDistribute, setIsDistribute] = useState(false);
  const handlerNumberInput = function (e) {
    const valueInput = e.target.value;
    setNumberText(valueInput.length);
  };

  const handlerDistribute = () => {
    setIsDistribute(true);
  };
  const handlerDistributeHiden = () => {
    setIsDistribute(false);
  };
  const onFinish = async (value) => {
    const {
      distributeProductImageDefault,
      distributeProductNameDefault,
      distributeProductPriceDefault,
      distributeProductQuantilyDefault,
      distributeProduct,
      items,
      brand,
      description,
      name,
      status,
      origin,
      nameGroupProduct,
      insurence,
      price,
      quantily,
    } = value;
    try {
      let productId = name
        .trim()
        .replace(/[`~!@#$%^&*|+=?;:'",.<>\{\}\[\]\\\/]/gi, "-");

      productId = productId.replace(/ /g, "-");

      if (listImgSetUp.some((img) => img.index === "0")) {
        if (distributeProduct) {
          const distributeProductDefault = {
            distributeProductName: distributeProductNameDefault,
            distributeProductPrice: distributeProductPriceDefault,
            distributeProductQuantily: distributeProductQuantilyDefault,
            distributeProductImage: distributeProductImageDefault,
          };
          distributeProduct.unshift(distributeProductDefault);

          const product = {
            items,
            brand,
            description,
            status,
            origin,
            nameGroupProduct,
            insurence,
            uid,
            name,
            images: listImgSetUp,
            productId: `${productId}-${uuidv4()}`,
            distributeProduct,
          };
          await api.postProduct(product);
        } else {
          const priceProduct = Number(price.replace(".", ""))
          const product = {
            ...value,
            uid,
            images: listImgSetUp,
            productId: `${productId}-${uuidv4()}`,
            quantily:Number(quantily),
            price: priceProduct,
          };
          await api.postProduct(product);
        }

        dispatch(upImageSlice.actions.deleteAllImage());

        
        navigate("/seller/products/list/all");
        notification["success"]({
          message: "lưu sản phẩm và hiển thị thành công!",
        });
      } else {
        notification["warning"]({
          message: "Vui lòng chọn ảnh bìa sản phẩm",
        });
      }
    } catch (error) {
      notification["error"]({
        message: "lưu sản phẩm thất bại vui lòng thử lại!",
      });
    }
  };



  useEffect(() => {

    return () =>{
      dispatch(upImageSlice.actions.deleteAllImage());
      
    }
  },[dispatch])

  return (
    <Form name="product" onFinish={onFinish} layout="vertical">
      <div className="products-add">
        <div className="container">
          <div className="products-add_container">
            <div className="products-add_header section-style">
              <h1>Thêm một sản phẩm mới</h1>
            </div>
            <div className="products-add_infobasic section-style">
              <h2>Thông tin cơ bản</h2>
              <div className="products-add_name">
                <Form.Item
                  name="name"
                  label="Tên sản phẩm"
                  rules={[
                    {
                      min: 10,
                      message: "Tên sản phẩm phải có ít nhất 10 kí tự",
                    },
                    {
                      required: true,
                      message: "vui lòng nhập tên sản phẩm",
                    },
                    {
                      whitespace: true,
                      message: "Tên sản phẩm không thể chứa toàn khoảng trắng",
                    },
                  ]}
                >
                  <Input
                    maxLength={120}
                    suffix={<span>{` ${numberText}/120`}</span>}
                    onChange={handlerNumberInput}
                    placeholder="Nhập tên sản phẩm"
                  />
                </Form.Item>
              </div>
              <div className="products-add_sellect">
                <Form.Item
                  name="items"
                  label="Chọn danh mục"
                  rules={[
                    {
                      required: true,
                      message: "vui lòng chọn ngành hàng",
                    },
                  ]}
                >
                  <TreeSelect
                    style={{ width: "100%" }}
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    treeData={treeData}
                    placeholder="Please select"
                    listHeight={350}
                  />
                </Form.Item>
              </div>

              <div className="products-add_infobasic section">
                <h3>Hình ảnh sản phẩm</h3>

                <div className="products-add_pickIMG">
                  <div className="products-add_img">
                    <UpImage index={0} />
                    <div>* Ảnh bìa</div>
                  </div>
                  <div className="products-add_img">
                    <UpImage index={1} />
                    <div>Hình ảnh 1</div>
                  </div>
                  <div className="products-add_img">
                    <UpImage index={2} />
                    <div>Hình ảnh 2</div>
                  </div>
                  <div className="products-add_img">
                    <UpImage index={3} />
                    <div>Hình ảnh 3</div>
                  </div>
                  <div className="products-add_img">
                    <UpImage index={4} />
                    <div>Hình ảnh 4</div>
                  </div>
                  <div className="products-add_img">
                    <UpImage index={5} />
                    <div>Hình ảnh 5</div>
                  </div>
                  <div className="products-add_img">
                    <UpImage index={6} />
                    <div>Hình ảnh 6</div>
                  </div>
                </div>
              </div>
              <div className="products-add_decription section">
                <div className="products-add_">
                  <Form.Item
                    name="description"
                    label="Mô tả sản phẩm"
                    rules={[
                      {
                        required: true,
                        message: "vui lòng nhập mô tả sản phẩm",
                      },
                      {
                        min: 100,
                        message: "Mô tả phải có ít nhất 100 kí tự",
                      },
                      {
                        whitespace: true,
                        message:
                          "Mô tả sản phẩm không được chứa toàn khoảng trắng",
                      },
                    ]}
                  >
                    <TextArea
                      showCount
                      maxLength={3000}
                      autoSize={{ minRows: 5, maxRows: 10 }}
                    ></TextArea>
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="products-add_infoSell section section-style">
              <h2>Thông tin bán hàng</h2>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <div className="products-add_price">
                    {!isDistribute && (
                      <Form.Item
                        name="price"
                        label="Giá thành"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập giá thành",
                          },
                        ]}
                      >
                        <Input
                          type="number"
                          placeholder="Nhập giá tiền"
                        ></Input>
                      </Form.Item>
                    )}
                  </div>
                  <div className="products-add_stock">
                    {!isDistribute && (
                      <Form.Item
                        name="quantily"
                        label="Kho hàng"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số lượng",
                          },
                        ]}
                      >
                        <Input
                          type="number"
                          placeholder="Nhập số lượng"
                        ></Input>
                      </Form.Item>
                    )}
                  </div>
                  <div className="products-add_origin">
                    <Form.Item name="origin" label="Xuất xứ">
                      <Select style={{ width: 120 }}>
                        <Option value="Việt Nam">Việt Nam</Option>
                        <Option value="Trung Quốc">Trung Quốc</Option>
                        <Option value="Nhật Bản">Nhật Bản</Option>
                        <Option value="Hàn Quốc">Hàn Quốc</Option>
                        <Option value="Đài Loan">Đài Loan</Option>
                        <Option value="Mỹ">Mỹ</Option>
                        <Option value="Khác">Khác</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                  <div className="products-add_price">
                    <Form.Item name="brand" label="Thương hiệu">
                      <Input placeholder="Nhập thương hiệu" />
                    </Form.Item>
                  </div>
                  <div className="products-add_stock">
                    <Form.Item name="status" label="Tình trạng">
                      <Select style={{ width: 120 }}>
                        <Option value="Mới">Mới</Option>
                        <Option value="cũ">cũ</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="products-add_origin">
                    <Form.Item name="insurence" label="Hạn bảo hành">
                      <Select style={{ width: 120 }} P>
                        <Option value="không">không </Option>
                        <Option value="6 tháng">6 tháng</Option>
                        <Option value="12 tháng">12 tháng</Option>
                        <Option value="24 tháng">24 tháng</Option>
                        <Option value="3 năm">3 năm</Option>
                        <Option value="5 năm">5 năm</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {!isDistribute && (
                  <div>
                    <Button
                      onClick={handlerDistribute}
                      type="primary"
                      style={{ color: "white", marginTop: 30 }}
                    >
                      Phân loại Hàng
                    </Button>
                  </div>
                )}
                {isDistribute && (
                  <div>
                    <Button
                      onClick={handlerDistributeHiden}
                      type="primary"
                      style={{ color: "white", marginTop: 30 }}
                    >
                      Ẩn phân loại
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {isDistribute && <ProductsDistribute />}

            <div className="section-style products-add_btn ">
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Lưu và hiển thị
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ProductsAdd;
