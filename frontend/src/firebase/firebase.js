import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: "AIzaSyCdc6PjgWAcKCg8D1p6Doprdq53SZt1kxY",
    authDomain: "tutor-hub-4b86c.firebaseapp.com",
    projectId: "tutor-hub-4b86c",
    storageBucket: "tutor-hub-4b86c.appspot.com",
    messagingSenderId: "726108214056",
    appId: "1:726108214056:web:299dd0459c3ceb6de8761d",
    measurementId: "G-B4WXKZ0R7T"
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

export {storage}