import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import {
  getAllProducts,
  getProductBySeasonAndYear,
  getProductByType,
} from "../../firebase/products";
import { currencyFormat } from "../../components/formatMoney";
import "react-lazy-load-image-component/src/effects/blur.css";
export default function Category() {
  let location = useLocation();
  let navigate = useNavigate();
  let [products, setProducts] = useState<any>();
  let querySerach = new URLSearchParams(location.search);
  useEffect(() => {
    if (querySerach.get("category")) {
      getAllProducts().then((data) => {
        setProducts(data);
      });
    } else if (querySerach.get("type")) {
      getProductByType(querySerach.get("type")!).then((data) => {
        setProducts(data);
      });
    } else if (querySerach.get("season")) {
      getProductBySeasonAndYear(
        querySerach.get("season")!,
        querySerach.get("year")!
      ).then((data) => {
        setProducts(data);
      });
    }
  }, [
    querySerach.get("category"),
    querySerach.get("type"),
    querySerach.get("season"),
  ]);

  let handleProductClick = (_id: string) => {
    navigate(`/category/product/${_id}`);
  };

  return (
    <div className="categoryPage">
      <div className="container">
        <div className="categoryPage__content">
          {/* TODO: filter and sort by */}
          {/* TODO: all products */}
          <div className="products">
            {products &&
              products.map((product: any, index: number) => (
                <div
                  className="products__product"
                  key={index}
                  onClick={() => handleProductClick(product._id)}
                >
                  <LazyLoadImage
                    src={product.images[0]}
                    alt="product image"
                    className="products__product-img"
                    effect="blur"
                  />
                  {/* <img
                    src={product.images[0]}
                    alt="product image"
                    className="products__product-img"
                  /> */}
                  <div className="products__product-namePrice">
                    <span>
                      {product.name.split(" ").slice(0, 4).join(" ")}...
                    </span>
                    <span>{currencyFormat(Number(product.price))}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
