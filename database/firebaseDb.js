import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD37glLnA3AsBcDx6LGTtw7F8mQryTrkIc",
  authDomain: "hackoverflow-6d288.firebaseapp.com",
  projectId: "hackoverflow-6d288",
  databaseURL: "https://hackoverflow-6d288-default-rtdb.firebaseio.com",
  storageBucket: "hackoverflow-6d288.appspot.com",
  messagingSenderId: "238443121687",
  appId: "1:238443121687:web:a608b071a807cb631d6052",
};

const app = initializeApp(firebaseConfig);
// const auth = app.auth();
export const db = getDatabase(app);
