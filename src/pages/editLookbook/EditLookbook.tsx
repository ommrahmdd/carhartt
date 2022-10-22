import React, { useState, useEffect } from "react";
import LoadMoreButton from "../../components/loadMoreButton/LoadMoreButton";
import Products from "../../components/products/Products";
import {
  addlookbookProducts,
  getCurrentlookbook,
  updateYearAndSeason,
} from "../../firebase/lookbook";
import { getProductBySeasonAndYear } from "../../firebase/products";
import { seasons, years } from "./utils";

export default function EditLookbook() {
  let [currentYearAndSeason, setCurrentYearAndSeason] = useState({
    year: new Date().getFullYear + "",
    season: "summer",
  });
  let [yearAndSeasonFromDb, setYearAndSeasonFromDb] = useState({
    year: "",
    season: "",
  });
  let [products, setProducts] = useState<any>([]);
  let [IS_FINISHED, setFINISHED] = useState<boolean>(false);
  let [counter, setCounter] = useState<number>(0);
  let [newProducts, setNewProducts] = useState<string[]>([]);
  useEffect(() => {
    getCurrentlookbook()
      .then((data) => {
        setYearAndSeasonFromDb({
          year: data.year,
          season: data.season,
        });
        return getProductBySeasonAndYear(data.season, data.year);
      })
      .then((snapShot) => {
        setProducts(snapShot);
      });
  }, []);

  let handleYearAndSeason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYearAndSeason((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  let handleUpdateYearAndSeasonButton = () => {
    updateYearAndSeason(
      currentYearAndSeason.year,
      currentYearAndSeason.season
    ).then(() => {
      window.location.reload();
    });
  };

  let handleLoadMoreButton = (_id: string) => {
    getProductBySeasonAndYear(
      yearAndSeasonFromDb.season,
      yearAndSeasonFromDb.year,
      _id
    ).then((data) => {
      if (data.length == 0) {
        setFINISHED(true);
      } else {
        setProducts((prevState: any) => [...prevState, ...data]);
      }
    });
  };

  let handleAddProductToLookBook = (_id: string) => {
    if (newProducts.length <= 10) {
      if (newProducts.indexOf(_id) != -1) {
        // setCounter(counter - 1);
        setNewProducts((prevState) => {
          return prevState.filter((product) => product != _id);
        });
      } else {
        // setCounter(counter + 1);
        setNewProducts((prevState) => [...prevState, _id]);
      }
    }
  };
  return (
    <main className="editLookBook">
      <div className="container">
        <div className="editLookBook__content">
          {/* STYLE: header */}
          <header className="editLookBook__content-header">
            <h4>Edit Lookbook</h4>
          </header>
          {/* ---------------------------------------------- */}
          {/* STYLE: Update Year and Season section */}
          <section className="editLookBook__content-yearAndSeason">
            <div className="lookbookBox">
              <div className="lookbookBox__years">
                <select
                  value={currentYearAndSeason.year}
                  name="year"
                  onChange={(e) => handleYearAndSeason(e)}
                >
                  {years.map((year, index) => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="lookbookBox__season">
                <select
                  value={currentYearAndSeason.season}
                  name="season"
                  onChange={(e) => handleYearAndSeason(e)}
                >
                  {seasons.map((season, index) => (
                    <option value={season} key={index}>
                      {season}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="customBtn sBtn"
              onClick={handleUpdateYearAndSeasonButton}
            >
              Update
            </button>
          </section>
          <div className="line"></div>

          {/* ---------------------------------------------- */}
          <section className="editLookBook__content-updateimgs">
            <div className="lookBookInfo">
              <h6>
                If you want to update lookbook images, You should delete all
                images first
              </h6>
              <button className="customBtn primaryBtn">
                Delete All Images
              </button>
            </div>

            {products.length == 0 ? (
              <>
                <div className="lookBookInfo">
                  <h6>After Select images, Click on Add Images Button</h6>
                  <button
                    className="customBtn primaryBtn"
                    onClick={() =>
                      addlookbookProducts(newProducts).then((data) => {
                        console.log(data);
                      })
                    }
                  >
                    Add Images
                  </button>
                </div>
                <Products
                  products={products}
                  handleAddProductToLookBook={handleAddProductToLookBook}
                  activeLookBook={newProducts}
                />
                <LoadMoreButton
                  IS_FINISHED={IS_FINISHED}
                  products={products}
                  handleLoadMoreBtn={handleLoadMoreButton}
                />
              </>
            ) : (
              ""
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
