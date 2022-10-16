import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
  useEffect(() => {
    getLookbookProducts().then((data: any) => {
      setProducts(data);
      setLookbook({ year: data[0].year, season: data[0].season });
    });
  }, []);
  return (
    <main className="lookbook">
      {products && (
        <div className="container">
          <div className="lookbook__content">
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
                <LazyLoadImage
                  src={products[1]?.images[0]}
                  className="header__imgs-1"
                  alt="product image"
                  effect="opacity"
                />
                <p className="header__imgs-txt">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Possimus perspiciatis molestias a id ratione commodi magni
                  laudantium animi.
                </p>
                <LazyLoadImage
                  src={products[3]?.images[0]}
                  className="header__imgs-2"
                  alt="product image"
                  effect="blur"
                />
              </div>
            </header>
          </div>
        </div>
      )}
    </main>
  );
}
