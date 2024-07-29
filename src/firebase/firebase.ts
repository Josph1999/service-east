// Import the functions you need from the SDKs you need
import { getStorage } from 'firebase/storage';
import { initializeApp, type FirebaseApp } from 'firebase/app';

import 'firebase/compat/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
} = {
  apiKey: "AIzaSyCsArK44-H1ZTmnbS4WN6CA9lNoeehXBz0",
  authDomain: "actionforum-5eae8.firebaseapp.com",
  projectId: "actionforum-5eae8",
  storageBucket: "actionforum-5eae8.appspot.com",
  messagingSenderId: "529764586138",
  appId: "1:529764586138:web:4723c484270d2adcb9c523"
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(app);
