import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js"

const firebaseConfig = {
  apiKey: "AIzaSyBZhiU2MlLpJbTItEfCns6GF4N6Nx9SO6Q",
  authDomain: "lincoln-base.firebaseapp.com",
  databaseURL: "https://lincoln-base-default-rtdb.firebaseio.com",
  projectId: "lincoln-base",
  storageBucket: "lincoln-base.appspot.com",
  messagingSenderId: "1079842332903",
  appId: "1:1079842332903:web:aa53012e0a067bd7124242"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)