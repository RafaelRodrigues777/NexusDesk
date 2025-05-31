// firebase-config.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDswRLlrpFGieUPCQyTpsTkN8kWZmyIje8",
  authDomain: "desksolutions-204dd.firebaseapp.com",
  databaseURL: "https://desksolutions-204dd-default-rtdb.firebaseio.com",
  projectId: "desksolutions-204dd",
  storageBucket: "desksolutions-204dd.appspot.com",
  messagingSenderId: "169920163822",
  appId: "1:169920163822:web:47f6b28c136922ac85e8ff",
  measurementId: "G-MER6JEHRSH"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Realtime Database
const db = getDatabase(app);

export { db };
