// import {renderCategoryView } from '../views/admin.view';
// import firebase from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/database';

import 'firebase/database/dist/index.cjs';
import { bootstrapadmin, displayUsers } from '../controllers/admin.controller';

var database = firebase.database();

export function getFlaggedQuestionService() {
    return new Promise(function(resolve) {
        const db = database.ref(`questions`);
        db.on('value', (questions) => {
            resolve(questions);
            console.log("SrCh");
        });
    })
}

export function revokeFlaggedQuestion(id) {
    database.ref(`questions/${id}`).update({
        is_flagged: false
    });
    //window.location.reload();
    document.getElementById('admin').innerHTML = "";
    bootstrapadmin();
}

export function getFlaggedAnswerService() {
    return new Promise(function(resolve) {
        const db = database.ref(`questions`);
        db.on('value', (questions) => {
            resolve(questions);
        });
    })
};

export function revokeFlaggedAnswer(id,qsnId) {
    firebase.database().ref(`questions/${qsnId}/answers/${id}`).update({
        is_flagged: false
    });
    //window.location.reload();
    document.getElementById('admin').innerHTML = "";
    bootstrapadmin();
}

// Asish
 
export function getAllUserService() {
let db = firebase.database().ref(`/users`);
return new Promise(function (resolve){
db.on('value',(data) => {
resolve(data);
//userDiv(data); 
});
});
} 
export function changeOfRole(id){
firebase.database().ref(`/users/${id}/role`).once('value',(data) => {
    if(data.val()==="Admin"){
        firebase.database().ref(`/users/${id}`).update({
            role: "normal"
            });
    }else{
        firebase.database().ref(`/users/${id}`).update({
            role: "Admin"
            });
    }
})

displayUsers();
} 

//Tejeswar

function IDGenerator() {

    this.length = 8;
    this.timestamp = +new Date;

    var _getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.generate = function () {
        var ts = this.timestamp.toString();
        var parts = ts.split("").reverse();
        var id = "";

        for (var i = 0; i < this.length; ++i) {
            var index = _getRandomInt(0, parts.length - 1);
            id += parts[index];
        }
        console.log();
        return id;
    }


}
export function renderWholeCategoryView() {
    getAllCategoriesWithTopics().then(data => {
        console.log(data);
        renderCategoryView(data);
    });
}

export function Category(name) {
    this.id = new IDGenerator().generate();
    this.name = name;

}
export function getAllCatFromFirebase() {
    return new Promise(function (resolve) {
        let refToCategories = firebase.database().ref().child("categories");
        refToCategories.on("value", function (snap) {
            console.log("Inside listener");
            let arrOfCategories = snap.val();
            //renderCategoryView(arrOfCategories);
            resolve(arrOfCategories);
            console.log("length of categories:" + arrOfCategories);
        });
    })
}
export function insertCategoryToFirebase(_categoryObj) {
    return new Promise(function(resolve,reject) {
        let ret =  firebase.database().ref('categories/'+_categoryObj.id).set({
             name:_categoryObj.name
     },function(error){
       if(error){
  console.log(error);
       }
       else{
  
           console.log("data inserted successfully");
           resolve("success");
       }
     });
     //resolve(ret);
  })
}
export function delteCategoryFromFirebaseById(id) {
    return new Promise(function (resolve) {
        firebase.database().ref().child("categories").child(id).remove();
        resolve("success");
    });
}

export function isCategoryAlreadyExist(catName){
    return new Promise(function(resolve){
        let isCategoryPresent = false;
        getAllCatFromFirebase().then((data => {
            console.log(data);
            if(data!=null){
            let arrOfKeys = Object.keys(data);
            console.log(arrOfKeys);
            console.log("Category name to be validated with:"+catName);
           
        for(let categoryCount = 0;categoryCount<arrOfKeys.length;categoryCount++){
            let catKey = arrOfKeys[categoryCount];
            let singleCatObj = data[catKey];
            console.log("==========:"+singleCatObj);
            //if(singleCatObj.name != null){
            if(singleCatObj.name == catName){
                isCategoryPresent = true;
                break;
            }
        //}
         }
        
        
       }
       console.log("Is category present:"+isCategoryPresent);
       resolve(isCategoryPresent);
    }));
    })
    
    }