
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXIMSSJi8slhfMM41ClFjyw5i7XqxsSSg",
  authDomain: "planilha-640a2.firebaseapp.com",
  projectId: "planilha-640a2",
  storageBucket: "planilha-640a2.firebasestorage.app",
  messagingSenderId: "446781442019",
  appId: "1:446781442019:web:4b759a9b21d155595682d6",
  measurementId: "G-5QSFJT0QXK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
