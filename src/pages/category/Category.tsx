import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import {
  getAllProducts,
  getProductByDiscount,
  getProductBySeasonAndYear,
  getProductByType,
} from "../../firebase/products";
import { currencyFormat } from "../../components/formatMoney";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loading from "../../components/loading/Loading";
import Products from "../../components/products/Products";
export default function Category() {
  let location = useLocation();
  let navigate = useNavigate();
  let [products, setProducts] = useState<any>([]);
  let [IS_FINISHED, setFINISHED] = useState<boolean>(false);
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
    } else if (querySerach.get("sale")) {
      getProductByDiscount().then((data) => {
        setProducts(data);
      });
    }

    setFINISHED(false);
  }, [
    querySerach.get("category"),
    querySerach.get("type"),
    querySerach.get("season"),
    querySerach.get("sale"),
  ]);

  // HANDLE: Load more button
  let handleLoadMoreBtn = (lastProduct: string) => {
    if (querySerach.get("category")) {
      getAllProducts(lastProduct).then((data) => {
        if (data.length == 0) setFINISHED(true);
        else setProducts((prevState: any) => [...prevState, ...data]);
      });
    } else if (querySerach.get("type")) {
      getProductByType(querySerach.get("type")!, lastProduct).then((data) => {
        if (data.length == 0) setFINISHED(true);
        else setProducts((prevState: any) => [...prevState, ...data]);
      });
    } else if (querySerach.get("season")) {
      getProductBySeasonAndYear(
        querySerach.get("season")!,
        querySerach.get("year")!,
        lastProduct
      ).then((data) => {
        if (data.length == 0) setFINISHED(true);
        else setProducts((prevState: any) => [...prevState, ...data]);
      });
    } else if (querySerach.get("sale")) {
      getProductByDiscount(lastProduct).then((data) => {
        if (data.length == 0) setFINISHED(true);
        else setProducts((prevState: any) => [...prevState, ...data]);
      });
    }
  };

  return (
    <div className="categoryPage">
      <div className="container">
        <div className="categoryPage__content">
          {/* TODO: filter and sort by */}
          {/* TODO: all products */}
          {/* <div className="products">
            {products.length > 0 ? (
              products.map((product: any, index: number) => (
                <div
                  className="products__product"
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
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
                    <span>
                      {product.name.split(" ").slice(0, 4).join(" ")}...
                    </span>
                    {product.discount > 0 ? (
                      <span>
                        {currencyFormat(
                          Number(
                            product.price -
                              (product.discount * product.price) / 100
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
          </div> */}
          <Products products={products} />
          {/* STYLE: Load More button */}
          {products.length > 0 && (
            <div className="loadMore">
              {IS_FINISHED == false && (
                <button
                  className="customBtn primaryBtn"
                  onClick={() => handleLoadMoreBtn(products.at(-1)._id)}
                >
                  <span>&rsaquo;</span> Load More
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
