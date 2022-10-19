import React, { useEffect, useState } from "react";
import { getHeader } from "../../firebase/homeUi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import header_1 from "./../../assets/header/3-lg.jpg";
import logo from "./../../assets/logo.png";
import { useNavigate } from "react-router-dom";
export default function Header() {
  let [headerImg, setHeaderImg] = useState<any>();
  let navigate = useNavigate();
  useEffect(() => {
    getHeader().then((res) => {
      setHeaderImg(res);
    });
  }, []);
  let handleShopNowBtn = () => {
    navigate(`/category?category=all`);
  };
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
              <button
                className="customBtn primaryBtn"
                onClick={handleShopNowBtn}
              >
                Shop Now <i className="fa-solid fa-arrow-right-long"></i>{" "}
              </button>
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
                  placeholderSrc={logo}
                />
              ))}
          </div>
        </div>
      </div>
    </header>
  );
}
