import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { storage } from "../../firebase/congif";
import {
  deleteHeaderImg,
  getHeader,
  updateHeader,
} from "../../firebase/homeUi";
import header_1 from "./../../assets/header/1-lg.jpg";
import header_2 from "./../../assets/header/3-lg.jpg";

export default function HomeUI() {
  let [imgs, setImgs] = useState<any>();
  let header = [header_1, header_2];
  let [headerImg, setHeaderImg] = useState<File>();
  useEffect(() => {
    getHeader().then((res: {}[]) => {
      setImgs(res);
      console.log(res);
    });
  }, []);
  let handleHeaderImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderImg((e.target as any).files[0]);
  };
  let submitHeaderImg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imgName = `${headerImg?.name}${v4()}`;
    let imgRef = ref(storage, `header/${imgName}`);
    uploadBytes(imgRef, headerImg!)
      .then((res) => {
        return getDownloadURL(res.ref);
      })
      .then((url) => {
        return updateHeader(url);
      })
      .then((data) => alert(data));
  };
  let handleDeleteImg = (id: string) => {
    let result = confirm("Want to delete ?");
    if (result)
      deleteHeaderImg(id).then((data) => {
        window.location.reload();
      });
  };
  return (
    <div className="homeUI">
      <div className="container">
        <div className="homeUI__content">
          <h2>Home UI</h2>
          {/* STYLE: header Section */}
          <section className="homeUI__header hSection">
            <h4>Header</h4>
            <div className="homeUI__header-imgs">
              {imgs &&
                imgs.map((img: { img: string; _id: string }, index: number) => (
                  <div className="" key={index}>
                    <LazyLoadImage
                      src={img.img}
                      className="header__img"
                      effect="blur"
                      placeholderSrc={header_1}
                    />
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => handleDeleteImg(img._id)}
                    ></i>
                  </div>
                ))}
            </div>
            <form onSubmit={(e) => submitHeaderImg(e)}>
              <label htmlFor="image">Add Image</label>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                id="image"
                onChange={(e) => handleHeaderImg(e)}
              />
              <button type="submit" className="customBtn primaryBtn">
                Add Image
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
