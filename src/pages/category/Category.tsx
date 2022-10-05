import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllCategory } from "../../firebase/homeUi";
import { getAllProducts } from "../../firebase/products";
export default function Category() {
  let location = useLocation();
  let [products, setProducts] = useState<any>();
  let querySerach = new URLSearchParams(location.search);
  useEffect(() => {
    if (querySerach.get("category")) {
      getAllProducts().then((data) => {
        console.log(data);
        setProducts(data);
      });
    }
  }, []);
  return (
    <div className="categoryPage">
      <div className="container">
        <div className="categoryPage__content">
          {/* TODO: filter and sort by */}
          {/* TODO: all products */}
          <div className="products">
            {products &&
              products.map((product: any, index: number) => (
                <div className="products__product" key={index}>
                  <img src={product.images[0]} alt="product image" />
                  <div className="products__product-namePrice">
                    <span>{product.name}</span>
                    <span>{product.price}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
