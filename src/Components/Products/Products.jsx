import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";

export default function Products() {
  useEffect(() => {
    getAllProducts();
  }, []);

  let [products, setProducts] = useState([]);
  async function getAllProducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    console.log(data.data);
    setProducts(data.data);
  }
  return (
    <>
      <div className="py-3">
        <div className="row gy-3">
          {products.map((product) => {
            return <Product product={product} key={product._id} />;
          })}
        </div>
      </div>
    </>
  );
}
