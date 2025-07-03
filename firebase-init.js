// firebase-init.js
// Import functions from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3E7sCvGIpj1Nd19o_-tahxrPnt1cQd1s",
  authDomain: "minnrai-232a6.firebaseapp.com",
  databaseURL: "https://minnrai-232a6-default-rtdb.firebaseio.com",
  projectId: "minnrai-232a6",
  storageBucket: "minnrai-232a6.appspot.com",
  messagingSenderId: "685787922063",
  appId: "1:685787922063:web:e801180ce987cff4c43afa",
  measurementId: "G-Z2CXB5J4E3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/**
 * Attaches Firebase functions to the global window object 
 * to be accessible by other scripts.
 */
window.firebaseMINNRAI = {
  /**
   * Fetches all data from the root of the Firebase Realtime Database.
   * @returns {Promise<object|null>} A promise that resolves with the snapshot value, or null if no data exists.
   */
  getWebData: async () => {
    try {
      const snapshot = await get(ref(db, "/"));
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error("Firebase Read Failed:", error);
      throw new Error("Could not connect to the database.");
    }
  },

  /**
   * Increments the visitor count for a specific feature.
   * @param {string} fitur - The key of the feature to increment (e.g., 'anime').
   * @returns {Promise<void>} A promise that resolves when the transaction is complete.
   */
  tambahVisitor: (fitur) => {
    if (!fitur) {
      console.error("Feature key is required to increment visitor count.");
      return Promise.reject("Invalid feature key.");
    }
    const fiturRef = ref(db, `/${fitur}/visitor`);
    // Use a transaction to safely increment the counter
    return runTransaction(fiturRef, (currentValue) => {
      return (currentValue || 0) + 1;
    });
  }
};

