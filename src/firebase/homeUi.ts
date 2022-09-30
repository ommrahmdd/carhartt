import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "./congif";

let headerCollection = collection(db, "header");
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
