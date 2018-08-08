import firebase from "firebase/app";
import 'firebase/database';
import { resolve } from "path";
import {getAllCatFromFirebase,getAllCategoriesWithTopics,Category,getAllCategories,getCategoryById,deleteCategoryById,createCategory,updateCategory} from './AdminApp/services/adminapp.service';
import {renderCategoryView} from './AdminApp/views/adminapp.view'
import './AdminApp/controller/adminapp.controller'
import  '../../../node_modules/bootstrap/dist/css/bootstrap.css';
//import '../../../node_modules/bootstrap/'
//import "../../../node_modules/jquery/dist/jquery.js";
//import "../../../node_modules/popper.js/dist/popper.js";
//import popper from '../../../node_modules/popper.js/dist/umd/popper'
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
//import "../../../node_modules/bootstrap/scss/bootstrap.scss";

import '../../css/index.css'
//import bootstrap from  '../../../node_modules/bootstrap/dist/css/bootstrap'
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyD8630axZDVQOmZiyRJuz6a86S-lqqafKI",
    authDomain: "xtstackoverflow-a056b.firebaseapp.com",
    databaseURL: "https://xtstackoverflow-a056b.firebaseio.com",
    projectId: "xtstackoverflow-a056b",
    storageBucket: "",
    messagingSenderId: "524512385642"
  };
  firebase.initializeApp(config);
/*
  var database = firebase.database().ref().child("categories");
  console.dir(database);
  database.on("value",function(snap) {
      console.log("Inside listener");
      let arrOfCategories = snap.val();
      renderCategoryView(arrOfCategories);
console.log("length of categories:"+arrOfCategories.length);
  });
  */
 
  getAllCatFromFirebase().then((data => {
    console.log(data);
    renderCategoryView(data);
}));


console.log("starting of users");
/*
let refToUsers = firebase.database().ref().child("users");
console.dir(refToUsers);
refToUsers.on("value",function(snap){
console.log("Inside the users callback");
console.dir(snap.val());
})
*/
export function getAllUsersFromFirebase(){
    return new Promise(function (resolve, reject) {
    let refToCategories = firebase.database().ref().child("users");
    refToCategories.on("value",function(snap) {
        console.log("Inside users fallback");
        let objOfUsers = snap.val();
        console.dir(objOfUsers);
        //renderCategoryView(arrOfCategories);
        resolve(objOfUsers);
  
    });
})
}
/*
getAllUsersFromFirebase().then((data => {
    //console.dir(data);
	let arrOfUsersKeys = Object.keys(data);
for(let categoryCount = 0;categoryCount<arrOfUsersKeys.length;categoryCount++){
    let catKey = parseInt(arrOfUsersKeys[categoryCount]);
     let singleUserObj = data[catKey];
   console.dir(singleUserObj);
}
}));
*/

console.log("ending of users");
firebase.database().ref('/users/0').once('value').then(function(snapshot) {
    console.dir(snapshot.val());
    return new Promise((resolve, reject) => {
        let name = snapshot.val().name;
        console.log("to be updated category:"+name);
        resolve(name);
    });
  }).then(function(userName){
console.log("update the  user:"+userName);

  })


  function updateDate(userId,userRole){
	var postData  = {
		//name : name,
		role :userRole
	};
	let userRef = firebase.database().ref().child("users").child(userId);
	userRef.once("value",function(snapshot){
		console.log("user is going to be update");
		console.dir(snapshot);
		userRef.update(postData);
		
	});
}
updateDate(1,"Admin");
/*  
getAllCategoriesWithTopics().then(data => {
    console.log(data);
    renderCategoryView(data);
});
*/
/*
function renderView(_arrOfCategories){
    for(let catCount = 0;catCount<_arrOfCategories.length;catCount++){
let singleCategoryObj = _arrOfCategories[catCount];
console.log(singleCategoryObj.name);
    }
}

function createCategoryObj(){
let catObj = new Category("Spring",[]);
createCategory(catObj);
}
createCategoryObj();
deleteCategoryById(100);
*/
/*
let arrOfCAt = getAllCategories1();
console.log(arrOfCAt.length);
*/
//console.table(arrOfCategories);
/*
getCategoryById(1).then(data => {
    console.log("retrieving single data");
    console.log(data)
});

deleteCategoryById(1).then(data => {
    console.log("Deleting single data");
    console.log(data)
});
*/
//createCategory();
//updateCategory(1);
// console.log("No of category:",    sarrOfCategories.length);