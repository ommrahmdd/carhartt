import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
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
