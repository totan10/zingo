const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get } = require('firebase/database');
const { getAuth, signInAnonymously } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyBTNmWeYthqfCVhqkshNYex5FG59f2hAKY",
  authDomain: "zingo-88d84.firebaseapp.com",
  databaseURL: "https://zingo-88d84-default-rtdb.firebaseio.com",
  projectId: "zingo-88d84",
  storageBucket: "zingo-88d84.firebasestorage.app",
  messagingSenderId: "249535229776",
  appId: "1:249535229776:web:1d48fb00b9d2c2c0634655",
  measurementId: "G-R5KGJGBPRD"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

async function test() {
  try {
    console.log("Attempting anonymous sign in...");
    await signInAnonymously(auth);
    console.log("Signed in anonymously successfully!");
  } catch (e) {
    console.log("Anonymous sign in failed:", e.message);
  }

  const paths = [
    "dus-ka-dum",
    "dus-ka-dum/timer",
    "dus-ka-dam",
    "dus-ka-dam/timer",
    "power-x/timer"
  ];
  for (const path of paths) {
    try {
      const snapshot = await get(ref(database, path));
      console.log(`Path: ${path} -> Success:`, JSON.stringify(snapshot.val()));
    } catch (e) {
      console.log(`Path: ${path} -> Error:`, e.message);
    }
  }
  process.exit(0);
}
test();
