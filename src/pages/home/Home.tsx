import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Title from "../../components/Title";
import men from "./../../assets/menKids/men.jpg";
import kids from "./../../assets/menKids/kids.jpg";
import history_1 from "./../../assets/history/1.webp";
import history_2 from "./../../assets/history/3.jpg";
import { news } from "./homeUtils";
import { getAllCategory, getHeader } from "../../firebase/homeUi";
import { getSalesProducts } from "../../firebase/products";
import { currencyFormat } from "../../components/formatMoney";
import "swiper/css";

export default function Home() {
  type ICategory = {
    data: {
      name: string;
      text: string;
      path: string;
    };
    img1: string;
    img2: string;
    _id: string;
  };
  let navigate = useNavigate();
  let [category, setCategories] = useState<ICategory[]>();
  let [salesProducts, setSalesProducts] = useState<any>();

  useEffect(() => {
    getAllCategory().then((data: any) => {
      setCategories(data);
    });
    getSalesProducts().then((data) => {
      console.log(data);
      setSalesProducts(data);
    });
  }, []);
  return (
    <main className="homePage">
      <Header />
      <div className="container">
        <Title title="Sale" to="sale" />
        {/* STYLE: sale */}
        <section className="sale">
          <Swiper slidesPerView={"auto"} spaceBetween={30}>
            {salesProducts &&
              salesProducts.map((product: any, key: number) => (
                <SwiperSlide
                  key={key}
                  onClick={() => {
                    navigate(`/category/product/${product._id}`, {
                      replace: true,
                    });
                  }}
                >
                  <span className="sale__discount">-{product.discount}%</span>
                  <img src={product.images[0]} alt="image" />
                  <div className="sale__details">
                    <p>{product.name.split(" ").slice(0, 5).join(" ")}...</p>
                    <p className="sale__price">
                      {currencyFormat(
                        Number(
                          product.price -
                            (product.discount * product.price) / 100
                        )
                      )}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </section>

        {/* STYLE: category */}
        <Title title="Categories" />
        <section className="categories">
          {category &&
            category.map((cat: any, index: number) => (
              <details className="categories__details" key={index}>
                <summary>
                  <span>0{index + 1}</span>
                  <p>{cat.data.name}</p>
                  <i className="fa-solid fa-arrow-right"></i>
                </summary>
                <div className="categories__details-product">
                  <div className="left"></div>
                  <div className="center">
                    <div className="center__left">
                      <p>{cat.data.text}</p>
                      <Link
                        to={`/${cat.data.path}`}
                        className="center__left-link"
                      >
                        See More{" "}
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </Link>
                    </div>
                    <div className="center__right">
                      {[cat.img1, cat.img2].map((img: string, key: number) => (
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
