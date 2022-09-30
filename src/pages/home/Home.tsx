import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Header from "../../components/header/Header";
import Title from "../../components/Title";
import men from "./../../assets/menKids/men.jpg";
import kids from "./../../assets/menKids/kids.jpg";
import { categories, products } from "./homeUtils";
import history_1 from "./../../assets/history/1.webp";
import history_2 from "./../../assets/history/3.jpg";
import { news } from "./homeUtils";
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
                      See More <i className="fa-solid fa-arrow-right-long"></i>
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
        {/* STYLE: men and kids */}
        <section className="menKids">
          <div className="menKids__men">
            <img src={men} alt="men photo" />
            <Link to="/" className="menKids__men-link">
              Mens <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="menKids__kids">
            <img src={kids} alt="kids photo" />
            <Link to="/" className="menKids__men-link">
              Kids <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </section>
        {/* STYLE: history section */}
        <section className="history">
          <div className="history__left">
            <img src={history_1} alt="history image" />
          </div>
          <div className="history__right">
            <div className="history__right-txt">
              <h5>History of the carhartt brand</h5>
              <div className="">
                <p>
                  Starting in the aftermath of Hurricane Harvey in 2017,
                  Carhartt joined forces with Team Rubicon to both outfit and
                  fund their mission to help whenever and wherever needed.
                  Compromised of more than 150,000 military vets, first
                  responders, and civilians, Team Rubicon volunteer Greyshirts
                  are called upon in times of disaster to help communities
                  prepare, respond, and recover.
                </p>
                <Link to="/" className="link">
                  More About
                </Link>
              </div>
            </div>
            <div className="history__right-img">
              <img src={history_2} alt="history image" />
            </div>
          </div>
        </section>
        {/* STYLE: News Section */}
        <Title title="News" to="news" />
        <section className="news">
          {news.slice(0, 2).map((_new, index) => (
            <div className="news__box">
              <img src={_new.img} alt="new image" />
              <h6>{_new.title}</h6>
              <p>{_new.overview}</p>
              <Link className="link" to="/">
                View
              </Link>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
