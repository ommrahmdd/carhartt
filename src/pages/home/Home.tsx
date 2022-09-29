import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Header from "../../components/header/Header";
import Title from "../../components/Title";

import { categories, products } from "./homeUtils";
export default function Home() {
  return (
    <main className="homePage">
      <Header />
      {/* STYLE: sale */}
      <div className="container">
        <Title title="Sale" to="sale" />
        <section className="sale">
          <Swiper slidesPerView={"auto"} spaceBetween={30}>
            {products.map((product, key) => (
              <SwiperSlide key={key}>
                <img src={product.img} alt="image" />
                <div className="sale__details">
                  <p>Title</p>
                  <p className="sale__price">{product.price}$</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* STYLE: category */}
        <Title title="Categories" />
        <section className="categories">
          {categories.map((cat, index) => (
            <details className="categories__details" key={index}>
              <summary>
                <span>0{index + 1}</span>
                <p>{cat.title}</p>
                <i className="fa-solid fa-arrow-right"></i>
              </summary>
              <div className="categories__details-product">
                <div className="left"></div>
                <div className="center">
                  <div className="center__left">
                    <p>{cat.text}</p>
                    <Link to={`/${cat.to}`} className="center__left-link">
                      More See
                    </Link>
                  </div>
                  <div className="center__right">
                    {cat.imgs.map((img, key) => (
                      <img src={img} alt="category image" key={key} />
                    ))}
                  </div>
                </div>
              </div>
            </details>
          ))}
        </section>
      </div>
    </main>
  );
}
