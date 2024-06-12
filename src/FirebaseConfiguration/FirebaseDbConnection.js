
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDOI7gWM6ezvu4oZz9kZ67hOFe0cr1GaoE",
  authDomain: "cheatchatmern2307.firebaseapp.com",
  projectId: "cheatchatmern2307",
  storageBucket: "cheatchatmern2307.appspot.com",
  messagingSenderId: "148551324438",
  appId: "1:148551324438:web:837c6c03bc4d5aad2a7637"
};

// Initialize Firebase
const dbapp = initializeApp(firebaseConfig);
console.log("firebase connection done");
export default dbapp