import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import {
  getCurrentlookbook,
  getLookbookProducts,
} from "../../firebase/lookbook";
import { IProduct } from "../addProduct/IProduct.model";
import { Ilookbook } from "./Ilookbook";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

export default function Lookbook() {
  let [products, setProducts] = useState<IProduct[]>();
  let [lookbook, setLookbook] = useState<Ilookbook>({
    year: "",
    season: "",
  });
  let navigate = useNavigate();
  useEffect(() => {
    getLookbookProducts().then((data: any) => {
      setProducts(data);
      setLookbook({ year: data[0].year, season: data[0].season });
    });
  }, []);

  // HANDLE: Route product
  let handleProductClick = (id: string) => {
    navigate(`/category/product/${id}`, { replace: true });
  };

  // HANDLE: Product Image HTML
  let productImgHTML = (
    index: number,
    _className: string,
    imgBox_index: string
  ) => {
    return (
      <div className={`lookbook-imgBox ${_className}`}>
        <LazyLoadImage
          src={products![index]?.images[0]}
          className={`${_className}-${imgBox_index} `}
          alt="product image"
          effect="opacity"
        />
        <div className="overlay">
          <button
            className="customBtn linkBtn"
            onClick={() => handleProductClick(products![index]._id!)}
          >
            View <span>&rsaquo;</span>
          </button>
        </div>
      </div>
    );
  };

  // HANDLE: Route Category Click
  let handleCaTegoryClick = () => {
    navigate(`/category?season=${lookbook.season}&year=${lookbook.year}`, {
      replace: true,
    });
  };
  return (
    <main className="lookbook">
      {products && (
        <div className="container">
          <div className="lookbook__content">
            {/* ---------------------------- START STYLE: Header */}
            <header className="header">
              {lookbook && (
                <h3 className="header__title">
                  <div>
                    {lookbook.season}'
                    {lookbook.year.split("").slice(2).join("")}
                  </div>
                  <div>lookbook</div>
                </h3>
              )}
              <div className="header__imgs">
                <div className="header__imgs-imgBox lookbook-imgBox">
                  <LazyLoadImage
                    src={products[1]?.images[0]}
                    className="header__imgs-1 "
                    alt="product image"
                    effect="opacity"
                  />
                  <div className="overlay">
                    <button
                      className="customBtn linkBtn"
                      onClick={() => handleProductClick(products![1]._id!)}
                    >
                      View <span>&rsaquo;</span>
                    </button>
                  </div>
                </div>
                <p className="header__imgs-txt">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Possimus perspiciatis molestias a id ratione commodi magni
                  laudantium animi.
                </p>
                <div className="header__imgs-imgBox lookbook-imgBox">
                  <LazyLoadImage
                    src={products[3]?.images[0]}
                    className="header__imgs-2 "
                    alt="product image"
                    effect="opacity"
                  />
                  <div className="overlay">
                    <button
                      className="customBtn linkBtn"
                      onClick={() => handleProductClick(products![3]._id!)}
                    >
                      View <span>&rsaquo;</span>
                    </button>
                  </div>
                </div>
              </div>
            </header>
            {/* ---------------------------- END STYLE Header */}
            {/* ---------------------------- START STYLE: Section 1 */}
            <section className="sectionOne">
              {productImgHTML(4, "sectionOne__imgBox", "1")}
            </section>
            {/* ---------------------------- END STYLE Section 1 */}
            {/* ---------------------------- START STYLE: Section 2 */}
            <section className="sectionTwo">
              {productImgHTML(5, "sectionTwo__imgBox", "1")}
              {productImgHTML(6, "sectionTwo__imgBox", "2")}

              <p className="sectionTwo__txt">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore odio iusto totam expedita omnis hic temporibus
                officiis suscipit ex cumque!
              </p>
            </section>
            {/* ---------------------------- END STYLE Section 2 */}
            {/* ---------------------------- START STYLE: Section 3 */}
            <section className="sectionThree">
              {productImgHTML(7, "sectionThree__imgBox", "1")}
              {productImgHTML(8, "sectionThree__imgBox", "2")}
            </section>
            {/* ---------------------------- END STYLE Section 3 */}
            {/* ---------------------------- START STYLE: Section 4 */}
            <section className="sectionFour">
              {productImgHTML(9, "sectionFour__imgBox", "1")}
              {productImgHTML(9, "sectionFour__imgBox", "2")}
              {productImgHTML(8, "sectionFour__imgBox", "3")}
            </section>
            {/* ---------------------------- END STYLE Section 4 */}
            {/* ---------------------------- START STYLE: Section 5 */}
            <section className="sectionFive">
              {productImgHTML(1, "sectionFive__imgBox", "1")}
              <div className="sectionFive__txt">
                <button
                  className="sectionFive__txt-btn"
                  onClick={() => handleCaTegoryClick()}
                >
                  Go To Category <span>&rarr;</span>
                </button>
                <button
                  className="sectionFive__txt-btn"
                  onClick={() => navigate("/")}
                >
                  Back To Main Page<span>&rarr;</span>
                </button>
              </div>
            </section>
            {/* ---------------------------- END STYLE Section 5 */}
          </div>
        </div>
      )}
    </main>
  );
}
