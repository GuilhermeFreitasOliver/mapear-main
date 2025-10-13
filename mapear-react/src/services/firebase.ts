import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDBSzqiuj_PBeWcatGN_pcdnZ7P6sbCIoA",
  authDomain: "mapear-1245d.firebaseapp.com",
  projectId: "mapear-1245d",
  storageBucket: "mapear-1245d.firebasestorage.app",
  messagingSenderId: "364411738789",
  appId: "1:364411738789:web:a1d8d6a541d31c3a230b4c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { onAuthStateChanged };
export const signInWithGoogle = () => signInWithRedirect(auth, new GoogleAuthProvider());
export const signOut = () => firebaseSignOut(auth);
export const registerWithEmail = (email: string, password: string, displayName?: string) =>
  createUserWithEmailAndPassword(auth, email, password).then(async (cred) => {
    if (displayName) {
      try { await updateProfile(cred.user, { displayName }); } catch {}
    }
    return cred;
  });
export const loginWithEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);