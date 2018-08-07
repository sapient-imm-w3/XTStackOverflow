import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/database";
import '../../vendors/DataTables/css/jquery.dataTables.min.css';
import 'bootstrap/scss/bootstrap.scss';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../css/index.css';
import 'jquery';
import $ from 'jquery';
import '../../vendors/DataTables/js/jquery.dataTables.min.js';
import '../Admin/views/admin.view';
import '../Admin/controllers/admin.controller';

// var config = {
//     apiKey: "AIzaSyDP2RBixhdkck-4UQqcJkqF8i689SWUauE",
//     authDomain: "xtstackoverflow.firebaseapp.com",
//     databaseURL: "https://xtstackoverflow.firebaseio.com",
//     projectId: "xtstackoverflow",
//     storageBucket: "",
//     messagingSenderId: "873564884745"
//   };
//   firebase.initializeApp(config);
//   var provider = new firebase.auth.GoogleAuthProvider();     

// firebase.auth().signInWithPopup(provider).then(function(result) {
//    // This gives you a Google Access Token. You can use it to access the Google API.
//    var token = result.credential.accessToken;
//    // The signed-in user info.
//    var user = result.user;
//    console.log(token, "this is the token")
//    console.log(user, "this is the user")
//    // ...
//   }).catch(function(error) {
//    // Handle Errors here.
//    var errorCode = error.code;
//    var errorMessage = error.message;
//    // The email of the user's account used.
//    var email = error.email;
//    // The firebase.auth.AuthCredential type that was used.
//    var credential = error.credential;
//    // ...
//   });

$(document).ready(function() {
    $('#example').DataTable( {
        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   0
        } ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        },
        order: [[ 1, 'asc' ]]
    } );
} );




