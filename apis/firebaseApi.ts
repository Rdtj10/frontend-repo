import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQZgHZ0ldk2ckGSQeLrItM6yuefdqcxoM",
  authDomain: "test-467f9.firebaseapp.com",
  projectId: "test-467f9",
  storageBucket: "test-467f9.firebasestorage.app",
  messagingSenderId: "931018851028",
  appId: "1:931018851028:web:a4bdae8ceef4e753b6b141",
  measurementId: "G-621DWRYSKC",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
