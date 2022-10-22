import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { db } from "./congif";

let lookbookCollection = collection(db, "lookbook");
let productsCollection = collection(db, "products");

export let getCurrentlookbook = async () => {
  let snapShot = await getDocs(lookbookCollection);
  let lookbook = snapShot.docs[0].data();
  return lookbook;
};

export let getLookbookProducts = async () => {
  let lookbook = await getCurrentlookbook();
  let q = query(
    productsCollection,
    where("year", "==", lookbook.year),
    where("season", "==", lookbook.season)
  );
  let snapShot = await getDocs(q);
  let products = snapShot.docs.map((data) => {
    return {
      ...data.data(),
      _id: data.id,
    };
  });
  return products;
};

export let updateYearAndSeason = async (year: string, season: string) => {
  let snapShot = await getDocs(lookbookCollection);
  let docId = snapShot.docs[0].id;

  let docRef = doc(db, "lookbook", docId);
  await updateDoc(docRef, {
    year,
    season,
  });
};
