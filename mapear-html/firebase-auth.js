// mapear-main/firebase-auth.js

// 1. IMPORTANTE: Cole a sua configuração do Firebase aqui
const firebaseConfig = {
  apiKey: "AIzaSyDBSzqiuj_PBeWcatGN_pcdnZ7P6sbCIoA",
  authDomain: "mapear-1245d.firebaseapp.com",
  projectId: "mapear-1245d",
  storageBucket: "mapear-1245d.firebasestorage.app",
  messagingSenderId: "364411738789",
  appId: "1:364411738789:web:a1d8d6a541d31c3a230b4c"
};

// 2. Inicialização e instâncias globais
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 3. Objeto MapearAuth com todas as funções de autenticação e perfil
const MapearAuth = {
  // --- Funções de Autenticação ---
  registerWithEmail: (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  },
  loginWithEmail: (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  },
  signInWithGoogle: () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    // Corrigindo o problema de auto-logout:
    // O onAuthStateChanged vai lidar com o resultado do redirect.
    return auth.signInWithRedirect(provider);
  },
  signOut: () => {
    return auth.signOut();
  },
  onAuthStateChanged: (callback) => {
    return auth.onAuthStateChanged(callback);
  },
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // --- Funções de Perfil de Usuário ---
  
  // Salva os dados extras do usuário no Firestore
  createUserProfile: (userId, name, age, email) => {
    const userRef = db.collection('users').doc(userId);
    return userRef.set({
      name: name,
      age: age,
      email: email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  },

  // Busca os dados do perfil do usuário no Firestore
  getUserProfile: async (userId) => {
    if (!userId) return null;
    const userRef = db.collection('users').doc(userId);
    const doc = await userRef.get();
    if (doc.exists) {
      return doc.data(); // Retorna { name, age, email, ... }
    } else {
      console.warn("Perfil de usuário não encontrado no Firestore para o ID:", userId);
      return null;
    }
  }
};