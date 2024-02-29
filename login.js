// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRJph0yxSeE3fN_KsUr20p1JI70KsdkSU",
    authDomain: "notice-board-98214.firebaseapp.com",
    databaseURL: "https://notice-board-98214-default-rtdb.firebaseio.com",
    projectId: "notice-board-98214",
    storageBucket: "notice-board-98214.appspot.com",
    messagingSenderId: "389033309038",
    appId: "1:389033309038:web:a370df2638f06c95e8877f",
    measurementId: "G-XHPDGB6341"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

submitData.addEventListener('click', (e) => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;
/*
    //sign up user
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ... user.uid
            set(ref(database, 'users/' + user.uid), {
                email: email,
                password: password
            })
                .then(() => {
                    // Data saved successfully!
                    alert('user created successfully');
    
                })
                .catch((error) => {
                    // The write failed...
                    alert(error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            alert(errorMessage);
        });
*/
    // log in user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            
            window.location = 'https://docs.google.com/spreadsheets/d/1cUI6iHeKJlSfG6vbdxWm2LViPiez7Asq3QliY6axAok/edit?usp=sharing';
            // save log in details into real time database
            var lgDate = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: lgDate,
            })
                .then(() => {
                    // Data saved successfully!
                    alert('user logged in successfully');

                })
                .catch((error) => {
                    // The write failed...
                    alert(error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });

    //sign out user
    signOut(auth).then(() => {
           // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
});
