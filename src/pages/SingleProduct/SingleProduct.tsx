import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductByCategory, getProductById } from "../../firebase/products";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import logo from "./../../assets/logo.png";
import { currencyFormat } from "../../components/formatMoney";
import Title from "../../components/Title";
import Loading from "../../components/loading/Loading";
import {
  addProductToCart,
  checkProductInCart,
  removeProductFromCart,
} from "./_utils";
export default function SingleProduct() {
  let params = useParams();
  let navigate = useNavigate();
  let [product, setProduct] = useState<any>();
  let [suggest, setSuggest] = useState<any>();
  let [productInCart, setProductInCart] = useState<boolean>(false);

  useEffect(() => {
    getProductById(params.prodID!)
      .then((data: any) => {
        if (checkProductInCart(data._id)) {
          setProductInCart(true);
        }
        setProduct(data);
        return getProductByCategory(data.category);
      })
      .then((res: any) => {
        setSuggest(res.slice(0, 4));
      });
  }, [params]);

  return (
    <div className="singleProduct">
      <div className="container">
        <div className="singleProduct__content">
          <div className="singleProduct__content-left">
            {product &&
              product.images.map((img: string, index: number) => (
                <LazyLoadImage
                  className="product__image"
                  src={img}
                  key={index}
                  effect="blur"
                  placeholderSrc={logo}
                  alt="product image"
                />
              ))}
          </div>
          <div className="singleProduct__content-right">
            {product ? (
              <div className="product">
                <span className="product__code">Code {product.code}</span>
                <h4 className="product__name">{product.name}</h4>
                {product.discount ? (
                  <>
                    <p className="product__beforeDiscount">
                      {currencyFormat(Number(product.price))}
                    </p>
                    <h5>
                      {currencyFormat(
                        Number(
                          product.price -
                            (product.price * product.discount) / 100
                        )
                      )}
                    </h5>
                  </>
                ) : (
                  <h6 className="product__money">
                    {currencyFormat(Number(product.price))}
                  </h6>
                )}
                <div className="line"></div>
                <div className="product__colors">
                  <p>Colors</p>
                  <div className="product__colors-boxs">
                    {product.colors.map((color: string, index: number) => (
                      <div
                        className="color"
                        style={{
                          backgroundColor: `${color}`,
                        }}
                        key={index}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="line"></div>
                <div className="product__sizes">
                  <p>Size</p>
                  <div className="product__sizes-sizesBox">
                    {product.size.map((size: string, index: number) => (
                      <span key={index}>{size}</span>
                    ))}
                  </div>
                </div>
                <div className="line"></div>
                {productInCart ? (
                  <button
                    className="customBtn primaryBtn bg-danger w-100 my-3"
                    onClick={() => {
                      removeProductFromCart(product._id);
                      setProductInCart(false);
                      window.location.reload();
                    }}
                  >
                    Remove From Bag
                  </button>
                ) : (
                  <button
                    className="customBtn primaryBtn w-100 my-3"
                    onClick={() => {
                      addProductToCart(product._id);
                      setProductInCart(true);
                      window.location.reload();
                    }}
                  >
                    Add To Bag
                  </button>
                )}

                <div className="line"></div>
                <details className="product__details">
                  <summary className="product__details-summary">
                    <span>Description</span>
                    <i className="fa-solid fa-plus"></i>
                  </summary>
                  <p>{product.description}</p>
                </details>
                <div className="line"></div>
                <details className="product__details">
                  <summary className="product__details-summary">
                    <span>Shipping</span>
                    <i className="fa-solid fa-plus"></i>
                  </summary>
                  <p>{product.shipping}</p>
                </details>
                <div className="line"></div>
                <details className="product__details">
                  <summary className="product__details-summary">
                    <span>Returns</span>
                    <i className="fa-solid fa-plus"></i>
                  </summary>
                  <p>{product.returns}</p>
                </details>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div className="singleProduct__suggest"></div>
        <Title title="You May Like" />
        <div className="singleProduct__suggest-products">
          {suggest &&
            suggest.map((product: any, index: number) => (
              <div className="suggest__product" key={index}>
                <img
                  src={product.images[0]}
                  alt="product image"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/category/product/${product._id}`, {
                      replace: true,
                    });
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
