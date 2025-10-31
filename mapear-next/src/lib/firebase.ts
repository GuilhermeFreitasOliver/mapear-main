import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// Configuração do Firebase extraída de firebase-auth.js
const firebaseConfig = {
  apiKey: "AIzaSyDBSzqiuj_PBeWcatGN_pcdnZ7P6sbCIoA",
  authDomain: "mapear-1245d.firebaseapp.com",
  projectId: "mapear-1245d",
  storageBucket: "mapear-1245d.firebasestorage.app",
  messagingSenderId: "364411738789",
  appId: "1:364411738789:web:a1d8d6a541d31c3a230b4c",
};

// Inicialização segura (evita re-inicialização no Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };