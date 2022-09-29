import React from "react";
import header_1 from "./../../assets/header/3-lg.jpg";
import header_2 from "./../../assets/header/1-lg.jpg";
export default function Header() {
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
            <img
              src={header_1}
              alt="header image"
              className="header__right-1"
            />
            <img
              src={header_2}
              alt="header image"
              className="header__right-2"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
