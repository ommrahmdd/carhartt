import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./congif";

let headerCollection = collection(db, "header");
let categoryCollection = collection(db, "category");

export let getHeader = async () => {
  let docsRef = await getDocs(headerCollection);
  let imgs = docsRef.docs.map((img) => ({
    ...img.data(),
    _id: img.id,
  }));
  return imgs.slice(0, 2);
};
export let updateHeader = async (img: string) => {
  await addDoc(headerCollection, {
    img,
  });
  return "success";
};

export let deleteHeaderImg = async (id: string) => {
  let docRef = doc(db, "header", id);
  await deleteDoc(docRef);
  return "success";
};

export let addCategory = async (data: any) => {
  let docRef = await addDoc(categoryCollection, {
    data,
  });
  return docRef.id;
};

export let updateCategory = async (
  _id: string,
  imgName: string,
  img: string
) => {
  let docRef = doc(db, "category", _id);
  let updated = await updateDoc(docRef, {
    [imgName]: img,
  });
  return "success";
};

export let getCategory = async () => {
  let docRef = await getDocs(categoryCollection);
  let cats = docRef.docs.map((cat, index) => ({
    ...cat.data(),
    _id: cat.id,
  }));
  return cats;
};

export let getCategoryById = async (id: string) => {
  let docRef = doc(db, "category", id);
  let cat = await getDoc(docRef);
  return {
    ...cat.data(),
    _id: cat.id,
  };
};

export let updateCategoryText = async (
  name: string,
  text: string,
  path: string,
  id: string
) => {
  let docRef = doc(db, "category", id);
  await updateDoc(docRef, {
    data: {
      name,
      text,
      path,
    },
  });
};

export let deleteCategoryImg = async (img: string, id: string) => {
  let docRef = doc(db, "category", id);
  let updated = await updateDoc(docRef, {
    [img]: "",
  });
  return updated;
};

export let updateCategoryImg = async (img: string, url: string, id: string) => {
  let docRef = doc(db, "category", id);
  let updated = await updateDoc(docRef, {
    [img]: url,
  });
};

export let deleteCategory = async (id: string) => {
  let docRef = doc(db, "category", id);
  await deleteDoc(docRef);
};

export let getAllCategory = async () => {
  let docRef = await getDocs(categoryCollection);
  let cat = docRef.docs.map((category) => ({
    ...category.data(),
    _id: category.id,
  }));
  return cat;
};
