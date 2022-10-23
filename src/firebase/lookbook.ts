import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
  addDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./congif";
import { getProductById } from "./products";

let lookbookCollection = collection(db, "lookbook");
let productsCollection = collection(db, "products");
let lookbookProdctsCollection = collection(db, "lookbookProducts");

export let getCurrentlookbook = async () => {
  let snapShot = await getDocs(lookbookCollection);
  let lookbook = snapShot.docs[0].data();
  return lookbook;
};

// export let getLookbookProducts = async () => {
//   let lookbook = await getCurrentlookbook();
//   let q = query(
//     productsCollection,
//     where("year", "==", lookbook.year),
//     where("season", "==", lookbook.season)
//   );
//   let snapShot = await getDocs(q);
//   let products = snapShot.docs.map((data) => {
//     return {
//       ...data.data(),
//       _id: data.id,
//     };
//   });
//   return products;
// };

export let updateYearAndSeason = async (year: string, season: string) => {
  let snapShot = await getDocs(lookbookCollection);
  let docId = snapShot.docs[0].id;

  let docRef = doc(db, "lookbook", docId);
  await updateDoc(docRef, {
    year,
    season,
  });
};

export let addlookbookProducts = async (_ids: string[]) => {
  let result = await _ids.map(async (_id) => {
    await addDoc(lookbookProdctsCollection, { _id });
  });

  return result;
};

export let getlookBookProducts = async () => {
  let _ids = await getDocs(lookbookProdctsCollection);
  let products: string[] = [];
  _ids.docs.forEach((id) => {
    if (id.data()._id) {
      products.push(id.data()._id);
    }
  });
  return products;
};

export let deleteLookBookProduct = async (_id: string) => {
  let q = query(lookbookProdctsCollection, where("_id", "==", _id));
  let docs = await getDocs(q);
  await deleteDoc(docs.docs[0].ref);
};
// export let deleteLookBookProducts = async (_ids: string[]) => {
//   // let snapShot = await getDocs(lookbookProdctsCollection);
//   // snapShot.docs.forEach((d) => {});
//   _ids.forEach(async (id: string) => {
//     let q = query(lookbookProdctsCollection, where("_id", "==", id));
//     let docs = await getDocs(q);
//     console.log(docs);
//     await deleteDoc(docs.docs[0].ref);
//   });
// };
