import './index.AskAQuestion.controller';
import firebase from "firebase/app";
import "firebase/auth"

var config = {
    apiKey: "AIzaSyA5LE9PObCxc3tX0ZeFx2gdW2F102HeoOg",
    authDomain: "stackoverflowxt.firebaseapp.com",
    databaseURL: "https://stackoverflowxt.firebaseio.com",
    projectId: "stackoverflowxt",
    storageBucket: "",
    messagingSenderId: "1082794399425"
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