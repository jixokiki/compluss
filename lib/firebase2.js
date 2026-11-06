// // lib/firebase.ts
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// // Firebase config (yang kamu kirim)
// const firebaseConfig = {
//   apiKey: "AIzaSyBmTevWdHeBQHcFCHn3HIDYPFgQB9pPxLs",
//   authDomain: "waemandirikarya-wmk.firebaseapp.com",
//   projectId: "waemandirikarya-wmk",
//   storageBucket: "waemandirikarya-wmk.firebasestorage.app",
//   messagingSenderId: "707711091258",
//   appId: "1:707711091258:web:356a803e3615c350a02b03",
//   measurementId: "G-CLEHWTVMME",
// };

// // Initialize App (safe for SSR / HMR)
// let app;
// if (!getApps().length) {
//   app = initializeApp(firebaseConfig);
// } else {
//   app = getApp();
// }

// // Analytics is optional (will fail on SSR) — guard it
// let analytics = null;
// try {
//   if (typeof window !== "undefined") {
//     analytics = getAnalytics(app);
//   }
// } catch (err) {
//   // ignore analytics init error (e.g., during SSR)
//   analytics = null;
// }

// const db = getFirestore(app);
// const auth = getAuth(app);

// export { app, analytics, db, auth };
// export default app;




// client-side only
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ===== Akun Firestore (utama) =====
const wmkConfig = {
  apiKey: "AIzaSyBmTevWdHeBQHcFCHn3HIDYPFgQB9pPxLs",
  authDomain: "waemandirikarya-wmk.firebaseapp.com",
  projectId: "waemandirikarya-wmk",
  storageBucket: "waemandirikarya-wmk.appspot.com",
  messagingSenderId: "707711091258",
  appId: "1:707711091258:web:356a803e3615c350a02b03",
  measurementId: "G-CLEHWTVMME",
};

// ===== Akun Storage KBB =====
const kbbConfig = {
  apiKey: "AIzaSyBGXp7njzeLsonCVH0Ti4wirSdQ9ld07tk",
  authDomain: "kbb2-8b930.firebaseapp.com",
  projectId: "kbb2-8b930",
  storageBucket: "kbb2-8b930.appspot.com",
  messagingSenderId: "606228401063",
  appId: "1:606228401063:web:3ecf615d377ee8e9c64482",
  measurementId: "G-WGX6EP7SZ3",
};

// ===== Initialize apps =====
const wmkApp = !getApps().find(app => app.name === "wmk") 
  ? initializeApp(wmkConfig, "wmk") 
  : getApps().find(app => app.name === "wmk");

const kbbApp = !getApps().find(app => app.name === "kbb") 
  ? initializeApp(kbbConfig, "kbb") 
  : getApps().find(app => app.name === "kbb");

// ===== Export Firestore & Storage =====
export const db = getFirestore(wmkApp);          // Firestore utama
export const storage = getStorage(kbbApp);       // Storage KBB
