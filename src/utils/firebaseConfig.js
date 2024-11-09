import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBr_N19NyCR_S4pcqFT5S_DvRx2BoQUBAk",
  authDomain: "rehaabit-94f4b.firebaseapp.com",
  projectId: "rehaabit-94f4b",
  storageBucket: "rehaabit-94f4b.firebasestorage.app",
  messagingSenderId: "1053796311136",
  appId: "1:1053796311136:web:ea06b82eb711acf1efe305"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Storage
const storage = getStorage(app);

export { storage };