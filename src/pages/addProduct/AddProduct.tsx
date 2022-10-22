import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { storage } from "../../firebase/congif";
import { getAllCategory } from "../../firebase/homeUi";
import { addProduct, addProductImgs } from "../../firebase/products";
import { IProduct } from "./IProduct.model";
import { seasons, years } from "./../editLookbook/utils";
export default function AddProduct() {
  let [product, setProduct] = useState<IProduct>({
    code: "",
    name: "",
    type: "",
    category: "",
    price: 0,
    discount: 0,
    quantity: 0,
    colors: [],
    size: [],
    images: [],
    description: "",
    shipping: "",
    returns: "",
    year: "",
    season: "",
  });
  let [categories, setCategories] = useState<any>();
  let sizes = ["xs", "s", "m", "l", "xl"];

  useEffect(() => {
    getAllCategory().then((data: any) => {
      setCategories(data);
    });
  }, []);
  // HANDLE: Text
  let handleTextChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  let handleAddRemoveSize = (size: string) => {
    if (product.size.indexOf(size) == -1) {
      setProduct((prevState) => ({
        ...prevState,
        size: [...prevState.size, size],
      }));
    } else {
      product.size.splice(product.size.indexOf(size), 1);
      setProduct((prevState) => ({
        ...prevState,
      }));
    }
  };

  // HANDLE: colors
  let handleAddColor = () => {
    setProduct((prevState) => ({
      ...prevState,
      colors: [...prevState.colors, ""],
    }));
  };
  let handleRemoveColor = (index: number) => {
    product.colors.splice(index, 1);
    setProduct((prevState) => ({
      ...prevState,
    }));
  };
  let handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    product.colors[index] = e.target.value;
    setProduct((prevState) => ({
      ...prevState,
    }));
  };

  // HANDLE: images
  let handleAddImage = () => {
    setProduct((prevState) => ({
      ...prevState,
      images: [...prevState.images, ""],
    }));
  };
  let handleRemoveImage = (index: number) => {
    product.images.splice(index, 1);
    setProduct((prevState) => ({
      ...prevState,
    }));
  };
  let handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    product.images[index] = (e.target as any).files[0];
    setProduct((prevState) => ({
      ...prevState,
    }));
  };

  // HANDLE: submit
  let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addProduct(product).then((_id) => {
      product.images.forEach((img) => {
        let imgName = `${img.name}${v4()}`;
        let imgRef = ref(storage, `product/${_id}/${imgName}`);
        uploadBytes(imgRef, img)
          .then((res) => {
            return getDownloadURL(res.ref);
          })
          .then((url) => {
            return addProductImgs(_id, url);
          })
          .finally(() => {
            console.log("finaly");
          });
      });
    });
  };
  return (
    <main className="addProduct">
      <div className="container">
        <header>
          <h4>Add Product</h4>
        </header>
        <div className="line"></div>
        <section className="addProduct__content">
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4 addProduct__content-box">
              <label htmlFor="code">Code</label>
              <input
                type="text"
                id="code"
                name="code"
                value={product.code}
                onChange={(e) => handleTextChange(e)}
              />
            </div>
            <div className="mb-4 addProduct__content-box">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={(e) => handleTextChange(e)}
              />
            </div>
            <div className="mb-4 addProduct__content-box">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                min={1}
                value={product.price}
                onChange={(e) => handleTextChange(e)}
              />
            </div>
            <div className="mb-4 addProduct__content-box">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min={1}
                value={product.quantity}
                onChange={(e) => handleTextChange(e)}
              />
            </div>
            <div className="mb-4 addProduct__content-box">
              <label htmlFor="type">Type</label>
              <select
                name="type"
                id="type"
                value={product.type}
                onChange={(e) => handleTextChange(e)}
              >
                {["men", "kids"].map((type, index) => (
                  <option value={type} key={index}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 addProduct__content-box">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={product.category}
                onChange={(e) => handleTextChange(e)}
              >
                {categories &&
                  categories.map((category: any, index: number) => (
                    <option value={category.data.name} key={index}>
                      {category.data.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4 addProduct__content-box">
              <label htmlFor="discount">Discount</label>
              <input
                type="number"
                id="discount"
                name="discount"
                min={0}
                value={product.discount}
                onChange={(e) => handleTextChange(e)}
              />
            </div>
            {/* STYLE: years */}
            <div className="mb-4 addProduct__content-box">
              <label htmlFor="year">Year</label>
              <select name="year" onChange={(e) => handleTextChange(e)}>
                {years.map((year, index) => (
                  <option value={year} key={index}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            {/* STYLE: season */}
            <div className="mb-4 addProduct__content-box">
              <label>Season</label>
              <select name="season" onChange={(e) => handleTextChange(e)}>
                {seasons.map((season, index) => (
                  <option value={season} key={index}>
                    {season}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 addProduct__content-box">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                cols={30}
                rows={10}
                value={product.description}
                onChange={(e) => handleTextChange(e)}
              />
            </div>
            <div className="mb-4 addProduct__content-box">
              <label htmlFor="shipping">Shipping</label>
              <textarea
                id="shipping"
                name="shipping"
                cols={30}
                rows={10}
                value={product.shipping}
                onChange={(e) => handleTextChange(e)}
              />
            </div>
            <div className="mb-4 addProduct__content-box">
              <label htmlFor="returns">Returns</label>
              <textarea
                id="returns"
                name="returns"
                cols={30}
                rows={10}
                value={product.returns}
                onChange={(e) => handleTextChange(e)}
              />
            </div>
            {/* STYLE: sizes */}
            <div className="mb-4 addProduct__content-box sizes">
              <label htmlFor="">Sizes</label>
              {sizes.map((size, index) => (
                <div
                  key={index}
                  className={`sizes__sizeBox ${
                    product.size.indexOf(size) != -1 ? "activeSize" : ""
                  }`}
                  onClick={() => {
                    handleAddRemoveSize(size);
                  }}
                >
                  <p className="sizes__sizeBox-size">{size}</p>
                  <i
                    className={`${
                      product.size.indexOf(size) != -1
                        ? "fa-solid fa-minus"
                        : "fa-solid fa-plus"
                    } `}
                  ></i>
                  {/* <i class="fa-solid fa-minus"></i> */}
                </div>
              ))}
            </div>
            {/* STYLE: Colors */}
            <div className="mb-4 addProduct__content-box colors">
              <label htmlFor="">Colors</label>
              {product.colors.map((color, index) => (
                <div className="" key={index}>
                  <input
                    type="color"
                    key={index}
                    value={product.colors[index]}
                    onChange={(e) => handleColorChange(e, index)}
                  />
                  <button
                    className="customBtn primaryBtn "
                    type="button"
                    onClick={() => handleRemoveColor(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="customBtn primaryBtn"
                onClick={handleAddColor}
              >
                Add
              </button>
            </div>
            {/* STYLE: images */}
            <div className="mb-4 addProduct__content-box images">
              <label htmlFor="">Images</label>
              {product.images.map((img, key) => (
                <div className="images__imgBox" key={key}>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => handleImageChange(e, key)}
                  />
                  <button
                    type="button"
                    className="customBtn primaryBtn"
                    onClick={() => handleRemoveImage(key)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="customBtn primaryBtn"
                type="button"
                onClick={handleAddImage}
              >
                Add Image
              </button>
            </div>
            <button type="submit" className="customBtn sBtn">
              Add Product
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
