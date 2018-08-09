import {userDiv, renderCategoryView, createFlaggedAnswerDiv } from '../views/admin.view';
import firebase from "firebase/app";
import 'firebase/database';
import { CONSTANTS } from '../../../../node_modules/@firebase/util';

var config = {
    apiKey: "AIzaSyDP2RBixhdkck-4UQqcJkqF8i689SWUauE",
    authDomain: "xtstackoverflow.firebaseapp.com",
    databaseURL: "https://xtstackoverflow.firebaseio.com",
    projectId: "xtstackoverflow",
    storageBucket: "",
    messagingSenderId: "873564884745"
};
firebase.initializeApp(config);

var database = firebase.database();

export function getFlaggedQuestionService() {
    return new Promise(function(resolve,reject) {
        const db = database.ref(`questions`);
        db.on('value', (questions) => {
            resolve(questions);
        });
    })
}

export function revokeFlaggedQuestion(id) {
    console.log(id);
    database.ref(`questions/${id}`).update({
        is_flagged: "False"
    });
    window.location.reload();
}

export function getFlaggedAnswerService() {
    return new Promise(function(resolve,reject) {
        const db = database.ref(`questions`);
        db.on('value', (questions) => {
            resolve(questions);
        });
    })
};

export function revokeFlaggedAnswer(id) {
    console.log('Pink');
    firebase.database().ref(`questions/0/answers/${id}`).update({
        is_flagged: "False"
    });
    window.location.reload();
}

// Asish

export  function  getAllUserService() {
    let  db  =  firebase.database().ref(`/users`);
    db.on('value', (data)  =>  {
        userDiv(data);
    });
}

export  function  changeOfRole(id) {
    console.log(id);
    firebase.database().ref(`/users/${id}`).update({
        role:  "Admin"
    });
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
    return new Promise(function (resolve, reject) {
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
    return new Promise(function (resolve, reject) {
        let ret = firebase.database().ref('categories/' + _categoryObj.id).set({
            name: _categoryObj.name
        }, function (error) {
            if (error) {
                console.log(error);
            }
            else {

                console.log("data inserted successfully");
                resolve("success");
            }
        });
        //resolve(ret);
    })
}
export function delteCategoryFromFirebaseById(id) {
    return new Promise(function (resolve, reject) {
        firebase.database().ref().child("categories").child(id).remove();
        resolve("success");
    });
}

