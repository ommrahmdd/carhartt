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
import Loading from "../../components/loading/Loading";
export default function Category() {
  let location = useLocation();
  let navigate = useNavigate();
  let [products, setProducts] = useState<any>([]);
  let [IS_FINISHED, setFINISHED] = useState<boolean>(false);
  let querySerach = new URLSearchParams(location.search);
  let pageNumber: number = 1;
  useEffect(() => {
    if (querySerach.get("category")) {
      getAllProducts().then((data) => {
        console.log(data);
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

    setFINISHED(false);
  }, [
    querySerach.get("category"),
    querySerach.get("type"),
    querySerach.get("season"),
  ]);
  // HANDLE: product click
  let handleProductClick = (_id: string) => {
    navigate(`/category/product/${_id}`);
  };

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
    }
  };

  return (
    <div className="categoryPage">
      <div className="container">
        <div className="categoryPage__content">
          {/* TODO: filter and sort by */}
          {/* TODO: all products */}
          <div className="products">
            {products.length > 0 ? (
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
                  <div className="products__product-namePrice">
                    <span>
                      {product.name.split(" ").slice(0, 4).join(" ")}...
                    </span>
                    <span>{currencyFormat(Number(product.price))}</span>
                  </div>
                </div>
              ))
            ) : (
              <Loading />
            )}
          </div>

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
