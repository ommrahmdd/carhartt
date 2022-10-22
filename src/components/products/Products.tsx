import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { currencyFormat } from "../formatMoney";
import Loading from "../loading/Loading";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Products({
  products,
  handleAddProductToLookBook,
  activeLookBook,
}: any) {
  let navigate = useNavigate();
  let handleProductClick = (_id: string) => {
    navigate(`/category/product/${_id}`);
  };
  return (
    <div className="products">
      {products.length > 0 ? (
        products.map((product: any, index: number) => (
          <div
            className={`products__product ${
              activeLookBook && activeLookBook.indexOf(product._id) != -1
                ? "opacity"
                : ""
            }`}
            key={product._id}
            onClick={() => {
              if (handleAddProductToLookBook) {
                handleAddProductToLookBook(product._id);
              } else {
                handleProductClick(product._id);
              }
            }}
          >
            {Number(product.discount) > 0 ? (
              <div className="products__product-discount">
                -{product.discount}%
              </div>
            ) : (
              ""
            )}
            <LazyLoadImage
              src={product.images[0]}
              alt="product image"
              className="products__product-img"
              effect="blur"
            />
            <div className="products__product-namePrice">
              <span>{product.name.split(" ").slice(0, 4).join(" ")}...</span>
              {product.discount > 0 ? (
                <span>
                  {currencyFormat(
                    Number(
                      product.price - (product.discount * product.price) / 100
                    )
                  )}
                </span>
              ) : (
                <span>{currencyFormat(Number(product.price))}</span>
              )}
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}
