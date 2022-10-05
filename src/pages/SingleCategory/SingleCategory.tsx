import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { v4 } from "uuid";
import { storage } from "../../firebase/congif";
import {
  deleteCategory,
  deleteCategoryImg,
  getCategoryById,
  updateCategoryImg,
  updateCategoryText,
} from "../../firebase/homeUi";

export default function SingleCategory() {
  let catID: any = useParams().catID;
  let nagvigate = useNavigate();
  let [category, setCategory] = useState<any>({
    data: {
      name: "",
      text: "",
    },
    img1: "",
    img2: "",
    _id: "",
  });
  useEffect(() => {
    getCategoryById(catID).then((data: any) => {
      console.log(data);
      setCategory(data);
    });
  }, []);
  let handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(category);
    setCategory((prevState: any) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [e.target.name]: e.target.value,
      },
    }));
  };

  let handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(category.data);
    updateCategoryText(
      category.data.name,
      category.data.text,
      category.data.path,
      catID
    ).then(() => {
      nagvigate(-1);
    });
  };
  // https://firebasestorage.googleapis.com/v0/b/carhartt-2bc4e.appspot.com/o/category%2Fa_2.png4d3150c8-5c94-4de9-baf6-522e468446f9?alt=media&token=ec621ea5-dfea-40b0-99df-857f412a89ea

  let handleDeleteImg = (img: string) => {
    let result = confirm("Want to delete ?");
    if (result) {
      console.log(img);
      deleteCategoryImg(img, catID).then((data) => window.location.reload());
    }
  };

  let handleAddNewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    let imgName = `${(e.target as any).files[0].name}${v4()}`;
    let imgRef = ref(storage, `category/${imgName}`);
    uploadBytes(imgRef, (e.target as any).files[0])
      .then((res) => {
        return getDownloadURL(res.ref);
      })
      .then((url) => {
        if (category.img1) {
          return updateCategoryImg("img2", url, catID);
        } else if (category.img2) {
          return updateCategoryImg("img1", url, catID);
        }
      })
      .then(() => {
        window.location.reload();
      });
  };
  let handleDeleteCategory = () => {
    deleteCategory(catID).then(() => {
      nagvigate(-1);
    });
  };
  return (
    <div className="singleCategory">
      <div className="container">
        <div className="singleCategory__content">
          <div className="singleCategory__content-left">
            {category && (
              <form action="" onSubmit={(e) => handleFormSubmit(e)}>
                <div className="mb-4">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={category.data.name}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="">Text</label>
                  <textarea
                    rows={15}
                    cols={50}
                    value={category.data.text}
                    name="text"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <button type="submit" className="customBtn primaryBtn">
                  Update
                </button>
                <button
                  className="customBtn primaryBtn"
                  type="button"
                  onClick={handleDeleteCategory}
                >
                  Delete
                </button>
              </form>
            )}
          </div>
          <div className="singleCategory__content-right">
            {category && (
              <>
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={category.img1}
                    alt="product image"
                    className="mb-4"
                  />
                  <i
                    className="fa-solid fa-trash fs-2 text-danger"
                    onClick={() => {
                      handleDeleteImg("img1");
                    }}
                  ></i>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={category.img2}
                    alt="product image"
                    className="mb-4"
                  />
                  <i
                    className="fa-solid fa-trash fs-2 text-danger"
                    onClick={() => {
                      handleDeleteImg("img2");
                    }}
                  ></i>
                </div>
                {!category.img1 || !category.img2 ? (
                  <>
                    <input
                      type="file"
                      className="customBtn primaryBtn mt-5 fs-6"
                      onChange={(e) => handleAddNewImg(e)}
                    />
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
