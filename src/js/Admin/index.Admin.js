import {createUser,getAllUsers,changeOfRole,getFlaggedAnswers} from  './admin.service';
import '../../css/index.css';
import './controllers/admin.controller';
import '../../../node_modules/jquery/dist/jquery.js'
import $ from 'jquery';
import '../../vendors/DataTables/css/jquery.dataTables.min.css';
import '../../vendors/DataTables/js/jquery.dataTables.min';
import firebase from "firebase/app";
import "firebase/auth"
import 'firebase/database'

  var config = {
    apiKey: "AIzaSyD8Yk0Jz1RF6aMPkowldzNxpidP-XVspyk",
    authDomain: "xtstackoverflow-7b250.firebaseapp.com",
    databaseURL: "https://xtstackoverflow-7b250.firebaseio.com",
    projectId: "xtstackoverflow-7b250",
    storageBucket: "xtstackoverflow-7b250.appspot.com",
    messagingSenderId: "97040650140"
  };
  firebase.initializeApp(config);
  var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(token, "this is the token")
  console.log(user, "this is the user")
  // ...
 }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
 });