import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMlZb_umGaPtHEGmXqV0JgFjMDlrK3RcQ",
  authDomain: "maisquefilmesmoviesdb.firebaseapp.com",
  projectId: "maisquefilmesmoviesdb",
  storageBucket: "maisquefilmesmoviesdb.appspot.com",
  messagingSenderId: "314600518230",
  appId: "1:314600518230:web:e6cf25dfe0257d7fbd01f7"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export {auth};