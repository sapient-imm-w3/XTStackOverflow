import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import $ from 'jquery';
import {getFavCategories, getUser} from './service';

let config = {
    apiKey: "AIzaSyB27dZKtJ8xCD38hyNjtwfp5DCn14axl8s",
    authDomain: "sweetymedhu-9e71e.firebaseapp.com",
    databaseURL: "https://sweetymedhu-9e71e.firebaseio.com",
    projectId: "sweetymedhu-9e71e",
    storageBucket: "sweetymedhu-9e71e.appspot.com",
    messagingSenderId: "682645099129"
  };

firebase.initializeApp(config);

let provider = new firebase.auth.GoogleAuthProvider();
           
firebase.auth().signInWithPopup(provider).then(function(result) {
    let user = auth.currentUser;
    getUser(user);
    // getFavCategories();
}).catch(function(error) {
    console.log(error.code + error.message + error.email + error.credential );
});

export const database = firebase.database();
export const auth = firebase.auth();
