import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDFUoTHj4CGzw0P_JeYv_Qj7sMBcNGdqQI",
  authDomain: "carioca-coastal-club.firebaseapp.com",
  projectId: "carioca-coastal-club",
  storageBucket: "carioca-coastal-club.appspot.com",
  messagingSenderId: "839161326775",
  appId: "1:839161326775:web:d9e7cf3f9b3c8b3a0c8c8c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
