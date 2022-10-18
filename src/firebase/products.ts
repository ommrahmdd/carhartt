import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore";
import { IProduct } from "../pages/addProduct/IProduct.model";
import { db } from "./congif";

let productCollection = collection(db, "products");
let PAGE_SIZE: number = 5;

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

let lastDoc;
// HANDLE: get all products
export let getAllProducts = async (last_product_id: string = "0") => {
  // let size = (await getDocs(productCollection)).size;
  //----------- First get first 10 Products by default

  // ------------- START FIXME:
  // let firstQ = query(productCollection, orderBy("name"), limit(PAGE_SIZE));
  // let first = await getDocs(firstQ);
  // let lastProduct = first.docs[first.docs.length - 1];
  // ------------- END FIXME:

  // ----------- second get next products depend on last product
  let lastDocRef = doc(db, "products", last_product_id);
  let lastDocSnap = await getDoc(lastDocRef);
  let q;
  if (last_product_id != "0") {
    q = query(
      productCollection,
      orderBy("name"),
      startAfter(lastDocSnap),
      limit(PAGE_SIZE)
    );
  } else {
    q = query(
      productCollection,
      orderBy("name"),
      // startAt(lastProduct),
      limit(PAGE_SIZE)
    );
  }

  let snapShot = await getDocs(q);
  let products = snapShot.docs.map((product) => ({
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

// HANDLE: filter products by type
export let getProductByType = async (
  queryType: string,
  last_product_id: string = "0"
) => {
  let lastProductRef = doc(db, "products", last_product_id);
  let lastProductSnap = await getDoc(lastProductRef);
  let q;
  if (last_product_id != "0") {
    q = query(
      productCollection,
      where("type", "==", queryType),
      orderBy("name"),
      startAfter(lastProductSnap),
      limit(PAGE_SIZE)
    );
  } else {
    q = query(
      productCollection,
      where("type", "==", queryType),
      orderBy("name"),
      limit(PAGE_SIZE)
    );
  }
  let snapShot = await getDocs(q);
  let product = snapShot.docs.map((product) => {
    return {
      ...product.data(),
      _id: product.id,
    };
  });
  return product;
};

// HANDLE: filter products by season and year
export let getProductBySeasonAndYear = async (
  season: string,
  year: string,
  last_product_id: string = "0"
) => {
  console.log(last_product_id);
  let lastProductRef = doc(db, "products", last_product_id);
  let lastProductSnapShot = await getDoc(lastProductRef);
  let q;
  if (last_product_id != "0") {
    q = query(
      productCollection,
      where("season", "==", season),
      where("year", "==", year),
      orderBy("name"),
      startAfter(lastProductSnapShot),
      limit(PAGE_SIZE)
    );
  } else {
    q = query(
      productCollection,
      where("season", "==", season),
      where("year", "==", year),
      orderBy("name"),
      limit(PAGE_SIZE)
    );
  }
  let snapShot = await getDocs(q);
  return snapShot.docs.map((product) => ({
    ...product.data(),
    _id: product.id,
  }));
};
