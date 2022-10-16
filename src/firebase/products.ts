import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { IProduct } from "../pages/addProduct/IProduct.model";
import { db } from "./congif";
let productCollection = collection(db, "products");

// HANDLE: add new product
export let addProduct = async (data: Partial<IProduct>) => {
  let { ...newData } = data;
  delete newData.images;
  let docRef = await addDoc(productCollection, newData);
  return docRef.id;
};

// HANDLE: add Image to product
export let addProductImgs = async (id: string, img: string) => {
  let docRef = doc(db, "products", id);

  let product = await updateDoc(docRef, {
    images: arrayUnion(img),
  });
};

// HANDLE: get all products
export let getAllProducts = async () => {
  let docRef = await getDocs(productCollection);
  let products = docRef.docs.map((product) => ({
    ...product.data(),
    _id: product.id,
  }));
  return products;
};

// HANDLE: get single product
export let getProductById = async (id: string) => {
  let docRef = doc(db, "products", id);
  let product = await getDoc(docRef);
  return {
    ...product.data(),
    _id: product.id,
  };
};

// HANDLE: filter products by category
export let getProductByCategory = async (category: string, _slice: number) => {
  let q = query(productCollection, where("category", "==", category));
  let querySnapshot = await getDocs(q);
  let products = querySnapshot.docs.map((product) => ({
    ...product.data(),
    _id: product.id,
  }));
  return products.slice(0, _slice);
};

export let getProductByType = async (queryType: string) => {
  let q = query(productCollection, where("type", "==", queryType));
  let snapShot = await getDocs(q);
  let product = snapShot.docs.map((product) => {
    return {
      ...product.data(),
      _id: product.id,
    };
  });
  return product;
};
