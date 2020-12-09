const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/firestore');

firebase.initializeApp({
    apiKey: "NjM0ZDQxODgtN2RmOS00ZDFlLWJiYWEtZWE4YTRlNzRiZjNm",
    authDomain: "prueba-corpinto.firebaseapp.com",
    databaseURL: "https://prueba-corpinto.firebaseio.com",
    projectId: "prueba-corpinto",
    storageBucket: "prueba-corpinto.appspot.com",
    messagingSenderId: "134805903893",
    appId: "1:134805903893:web:67711a76a2fc04f2040c1c",
    //measurementId: "G-0JSCMHXRV0"
});

const auth = firebase.auth();
const db = firebase.database();
const firestore = firebase.firestore();

module.exports = { auth, db, firestore };