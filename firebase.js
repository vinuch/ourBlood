import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyA9lqYg9fNOhl-Ih3zZkfqiONGQFMZNwO4",
  authDomain: "our-blood.firebaseapp.com",
  databaseURL: "https://our-blood.firebaseio.com",
  projectId: "our-blood",
  storageBucket: "our-blood.appspot.com",
  messagingSenderId: "120837025566",
  appId: "1:120837025566:web:d3f01d52b061ad36c0630f",
  measurementId: "G-PBRH0YVE97"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')


// export utils/refs
export {
  db,
  auth,
  usersCollection,
}


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.18.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyA9lqYg9fNOhl-Ih3zZkfqiONGQFMZNwO4",
//     authDomain: "our-blood.firebaseapp.com",
//     databaseURL: "https://our-blood.firebaseio.com",
//     projectId: "our-blood",
//     storageBucket: "our-blood.appspot.com",
//     messagingSenderId: "120837025566",
//     appId: "1:120837025566:web:d3f01d52b061ad36c0630f",
//     measurementId: "G-PBRH0YVE97"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>