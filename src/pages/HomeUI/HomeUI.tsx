import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { storage } from "../../firebase/congif";
import {
  addCategory,
  deleteHeaderImg,
  getCategory,
  getHeader,
  updateCategory,
  updateHeader,
} from "../../firebase/homeUi";
import header_1 from "./../../assets/header/1-lg.jpg";
import { ICategory } from "./home.model";
type allCategoryType = {
  data: Omit<ICategory, "img1" | "img2">;
  img1: string;
  img2: string;
  _id: string;
};
export default function HomeUI() {
  let [imgs, setImgs] = useState<any>();
  let [headerImg, setHeaderImg] = useState<File>();
  let [category, setCategory] = useState<ICategory>({
    name: "",
    img1: "",
    img2: "",
    text: "",
    path: "",
  });
  let [allCategory, setAllCategory] = useState<allCategoryType[]>();
  useEffect(() => {
    getHeader().then((res: {}[]) => {
      setImgs(res);
    });
    getCategory().then((res: any) => {
      setAllCategory(res);
      console.log(res);
    });
  }, []);
  // HANDLE: Header
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
  // HANDLE: category
  let handleCategoryChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(category);
    setCategory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  let handleCategoryImgs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory((prevState) => ({
      ...prevState,
      [e.target.name]: (e.target as any).files[0],
    }));
  };
  let handleCategorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCategory({
      name: category.name,
      text: category.text,
      path: category.path,
    }).then((_id: string) => {
      let imgs = [category.img1, category.img2];
      imgs.forEach((img, index) => {
        let imgName = `${img.name}${v4()}`;
        let imgRef = ref(storage, `category/${imgName}`);
        uploadBytes(imgRef, img)
          .then((res) => {
            return getDownloadURL(res.ref);
          })
          .then((url) => {
            return updateCategory(_id, `img${index + 1}`, url);
          })
          .then((data) => {})
          .finally(() => {
            window.location.reload();
          });
      });
    });
  };
  return (
    <div className="homeUI">
      <div className="container">
        <div className="homeUI__content">
          <h2>/Home UI</h2>
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
          <div className="line"></div>
          {/* STYLE: Categories Section */}
          <h4>Categories</h4>
          <section className="homeUI__cat hSection">
            <div className="homeUI__cat-left">
              <form action="" onSubmit={(e) => handleCategorySubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={category.name}
                    id="name"
                    onChange={(e) => handleCategoryChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="text">text</label>
                  <input
                    type="text"
                    name="text"
                    value={category.text}
                    id="text"
                    onChange={(e) => handleCategoryChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="path">Path</label>
                  <input
                    type="text"
                    name="path"
                    value={category.path}
                    id="path"
                    onChange={(e) => handleCategoryChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image">Image 1</label>
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    name="img1"
                    onChange={(e) => handleCategoryImgs(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image">Image 2</label>
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    name="img2"
                    onChange={(e) => handleCategoryImgs(e)}
                  />
                </div>
                <button type="submit" className="customBtn primaryBtn mt-4">
                  Add Category
                </button>
              </form>
            </div>

            <div className="homeUI__cat-right">
              {allCategory &&
                allCategory.map((category, index) => (
                  <div className="categoryBox">
                    <h5>{category.data.name}</h5>
                    <p>{category.data.text}</p>
                    <div className="categoryBox__imgs">
                      {[category.img1, category.img2].map((img, index) => (
                        <img src={img} alt="image category" key={index} />
                      ))}
                    </div>
                    <Link
                      to={`/category/${category._id}`}
                      className="link mt-3 d-block btn btn-dark"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
