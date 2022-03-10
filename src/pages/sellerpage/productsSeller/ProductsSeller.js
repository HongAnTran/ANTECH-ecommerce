import React from 'react';
import { Route , Routes} from 'react-router-dom'
import ProductsAdd from '../productsAdd/ProductsAdd';
import ProductsAll from '../productsAll/ProductsAll';

function ProductsSeller() {
  return <div>
      <Routes>

        <Route path="/list/all" element={<ProductsAll />}></Route>
        <Route path="/category" element={<ProductsAdd />}></Route>
      </Routes>
  </div>;
}

export default ProductsSeller;
