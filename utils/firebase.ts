import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB13hp50njKYVmmJ_wLFITfZhqAwUj1g_g",
  authDomain: "app-taskgo-dev.firebaseapp.com",
  projectId: "app-taskgo-dev",
  storageBucket: "app-taskgo-dev.appspot.com",
  messagingSenderId: "959970253704",
  appId: "1:959970253704:web:a3251787d3e0eb8afe783d",
};

// Initialize Firebase
let firebaseApp;
switch (process.env.NEXT_PUBLIC_STAGE) {
  case "dev":
    firebaseApp = initializeApp(firebaseConfig);
    break;
}

export const auth = getAuth(firebaseApp);
