import React, { useState } from "react";
import { updateYearAndSeason } from "../../firebase/lookbook";
import { seasons, years } from "./utils";

export default function EditLookbook() {
  let [currentYearAndSeason, setCurrentYearAndSeason] = useState({
    year: "2022",
    season: "summer",
  });
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
      console.log("updated");
    });
  };
  return (
    <main className="editLookBook">
      <div className="container">
        <div className="editLookBook__content">
          <header className="editLookBook__content-header">
            <h4>Edit Lookbook</h4>
          </header>
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
        </div>
      </div>
    </main>
  );
}
