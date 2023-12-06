import firebase from "firebase/compat/app";
import "firebase/compat";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBQvxV4o019nFbyQ-usIkIKaYOzMw7uSgg",
  authDomain: "testupload-f8d69.firebaseapp.com",
  projectId: "testupload-f8d69",
  storageBucket: "testupload-f8d69.appspot.com",
  messagingSenderId: "445865676184",
  appId: "1:445865676184:web:e83099598bd3dd4957afed",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
