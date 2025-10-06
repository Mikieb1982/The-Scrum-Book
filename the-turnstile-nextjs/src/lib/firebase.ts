// Client-side Firebase init for Spark plan (no admin SDK)
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQn_UqDjEOrCP0iHF0Np3O-2BPGwMkutU",
  authDomain: "the-scrum-book.firebaseapp.com",
  projectId: "the-scrum-book"
  // storageBucket/auth/etc optional for now
};

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
