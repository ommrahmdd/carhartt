import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDkJBCNK8IOm4-uFGQiEffV47Mr7BfjgFM",
  authDomain: "carhartt-2bc4e.firebaseapp.com",
  projectId: "carhartt-2bc4e",
  storageBucket: "carhartt-2bc4e.appspot.com",
  messagingSenderId: "195984987465",
  appId: "1:195984987465:web:9fff2d34d3bfec1d60b698",
};
let app = initializeApp(firebaseConfig);
export let db = getFirestore(app);
export let storage = getStorage(app);
