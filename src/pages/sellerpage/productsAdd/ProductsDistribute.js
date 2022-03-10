import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./productsadd.scss";
import { Select } from "antd";
const { Option } = Select;
function ProductsDistribute() {
  const [nameGroup, setNameGroup] = useState("");

  const handlerChangeName = (e) => {
    setNameGroup(e.target.value);
  };

  return (
    <div className="section-style section product-add_distribute">
      <Form.Item
        name="nameGroupProduct"
        label="Tên nhóm phân loại"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập Tên nhóm phân loại",
          },
        ]}
      >
        <Input
          onChange={handlerChangeName}
          value={nameGroup}
          placeholder="ví dụ: màu sắc kích thước"
          style={{ width: "60%" }}
        />
      </Form.Item>

      <div className="product-list_distribute">
        <h4>Phân loại hàng*</h4>
        <div className="product-list_distribute-header">
          <div className="row gx-0">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
              <div className="product-list_header-col">
                <span> {nameGroup} </span>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
              <div className="product-list_header-col">
                <span>Giá </span>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
              <div className="product-list_header-col">
                <span>Số lượng </span>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
              <div className="product-list_header-col">
                <span>hình ảnh số</span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-list_distribute-bottom">
          <div className="row gx-0">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
              <Form.Item
                name="distributeProductNameDefault"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập loại hàng",
                  },
                ]}
              >
                <Input placeholder="Loại" />
              </Form.Item>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
              <Form.Item
                name={["distributeProductPriceDefault"]}
                rules={[{ required: true, message: "vui lòng nhập giá " }]}
              >
                <Input placeholder="Nhập vào" type="number" />
              </Form.Item>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
              <Form.Item
                name={["distributeProductQuantilyDefault"]}
                rules={[{ required: true, message: "Điền số lượng hàng" }]}
              >
                <Input placeholder="" type="number" />
              </Form.Item>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
              <Form.Item name={["distributeProductImageDefault"]}>
                <Select>
                  <Option value="1">1</Option>
                  <Option value="2">2 </Option>
                  <Option value="3">3 </Option>
                  <Option value="4">4 </Option>
                  <Option value="5">5</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>
      </div>

      <Form.List name="distributeProduct">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                className="product-list_distribute-container"
                style={{ display: "flex" }}
                key={key}
              >
                <div className="product-list_distribute" style={{ flex: 1 }}>
                  <h4>Phân loại hàng*</h4>
                  <div className="product-list_distribute-header">
                    <div className="row gx-0">
                      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <div className="product-list_header-col">
                          <span> {nameGroup} </span>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <div className="product-list_header-col">
                          <span>Giá </span>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <div className="product-list_header-col">
                          <span>Số lượng </span>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <div className="product-list_header-col">
                          <span>hình ảnh số</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="product-list_distribute-bottom">
                    <div className="row gx-0">
                      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <Form.Item
                          {...restField}
                          name={[name, "distributeProductName"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập loại hàng",
                            },
                          ]}
                        >
                          <Input placeholder="Loại" />
                        </Form.Item>
                      </div>

                      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <Form.Item
                          {...restField}
                          name={[name, "distributeProductPrice"]}
                          rules={[
                            { required: true, message: "vui lòng nhập giá " },
                          ]}
                        >
                          <Input placeholder="Nhập vào" type="number" />
                        </Form.Item>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <Form.Item
                          {...restField}
                          name={[name, "distributeProductQuantily"]}
                          rules={[
                            { required: true, message: "Điền số lượng hàng" },
                          ]}
                        >
                          <Input placeholder="" type="number" />
                        </Form.Item>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                        <Form.Item
                          {...restField}
                          name={[name, "distributeProductImage"]}
                        >
                          <Select>
                            <Option value="1">1</Option>
                            <Option value="2">2 </Option>
                            <Option value="3">3 </Option>
                            <Option value="4">4 </Option>
                            <Option value="5">5</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Thêm phân loại hàng
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default ProductsDistribute;
