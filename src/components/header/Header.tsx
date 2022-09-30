import React, { useEffect, useState } from "react";
import { getHeader } from "../../firebase/homeUi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import header_1 from "./../../assets/header/3-lg.jpg";
import header_2 from "./../../assets/header/1-lg.jpg";
export default function Header() {
  let [headerImg, setHeaderImg] = useState<any>();
  useEffect(() => {
    getHeader().then((res) => {
      setHeaderImg(res);
    });
  }, []);
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__left">
            <div className="header__left-txt">
              <h1>
                <div className="">Work In</div>
                <div className="">Progress</div>
              </h1>
              <a href="/">
                Shop Now <i className="fa-solid fa-arrow-right-long"></i>{" "}
              </a>
            </div>
          </div>
          <div className="header__right">
            {headerImg &&
              headerImg.map((img: any, index: number) => (
                <LazyLoadImage
                  src={img.img}
                  className={` header__right-img${index}`}
                  key={index}
                  effect="blur"
                  placeholderSrc={header_1}
                />
              ))}
          </div>
        </div>
      </div>
    </header>
  );
}
