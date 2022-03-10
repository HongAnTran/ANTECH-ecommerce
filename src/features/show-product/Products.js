import React, { memo, useEffect } from "react";
import Card from "../../components/card/Card";
import { useSelector, useDispatch } from "react-redux";
import { productsSelector } from "../../redux/selector";
import productsSlice from "./productsSlice";
function Products() {
  const products = useSelector(productsSelector);


  
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsSlice.actions.getAllProductsRequest());
  }, [dispatch]);
  return (
    <div className="products-container">
      <div className="row gy-4">
        {products.map((product) => {
          return (
            
            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3" key={product._id}>
              <div className="product-item p-1">
                <Card discount={12} name={product.name} price={product.price} img={product.images[0].path} sold={product.sold} priceMin={product.priceMin} 
                productId={product.productId}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(Products);
