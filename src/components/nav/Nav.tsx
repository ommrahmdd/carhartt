import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/logo.png";
import { handleCloseMenu, handleOpenMenu } from "./navUtils";
export default function Nav() {
  let navigate = useNavigate();
  let all: string[] = ["men", "Kids", "lookbook", "Bag"];
  let left: string[] = ["men", "Kids", "lookbook"];
  return (
    <nav className="customNav">
      <div className="container">
        <div className="customNav__grid">
          <div className="customNav__left">
            <ul>
              {/* {left.map((item, index) => (
                <li className="customNav__left-item" key={index}>
                  <Link to={`/${item}`} className="customNav__left-link">
                    {item}
                  </Link>
                </li>
              ))} */}
              <li className="customNav__left-item">
                <Link
                  to={`/category?type=men`}
                  className="customNav__left-link"
                >
                  Men
                </Link>
              </li>
              <li className="customNav__left-item">
                <Link
                  to={`/category?type=kids`}
                  className="customNav__left-link"
                >
                  Kids
                </Link>
              </li>
              <li className="customNav__left-item">
                <Link to={`/lookbook`} className="customNav__left-link">
                  Lookbook
                </Link>
              </li>
            </ul>
          </div>
          <div className="customNav__center">
            <div
              className="customNav__center-imgBox"
              onClick={() => navigate("/")}
            >
              <img src={logo} alt="logo" />
            </div>
            {/* <p>carhartt</p> */}
          </div>
          <div className="customNav__right">
            <div
              className="bars"
              onClick={() => handleOpenMenu(document.querySelector(".menu"))}
            >
              <i className="fa-solid fa-bars"></i>
            </div>
            <ul>
              <li>
                <Link to="/" className="customNav__right-link">
                  Sign in
                </Link>
              </li>
              <li>
                <Link to="/" className="customNav__right-link">
                  Bag (0)
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* STYLE: menu */}
        <div
          className="menu"
          onClick={() => handleCloseMenu(document.querySelector(".menu"))}
        >
          <ul>
            {all.map((item, index) => (
              <li className="menu__item" key={index}>
                <Link to={`/${item}`} className="menu__item-link">
                  {item}
                </Link>
              </li>
            ))}
            <li className="menu__item">
              <Link to="/" className="menu__item-link">
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
