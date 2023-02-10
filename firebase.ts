// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC3ndCnOTbb2ykCb2kVwkfBcpKu4kKH3q8",
	authDomain: "myai-ad46c.firebaseapp.com",
	projectId: "myai-ad46c",
	storageBucket: "myai-ad46c.appspot.com",
	messagingSenderId: "815868908569",
	appId: "1:815868908569:web:6471d33cf019f45e4c4688",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
