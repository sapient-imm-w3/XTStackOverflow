import { createFlaggedDiv, userDiv, renderCategoryView, createFlaggedAnswerDiv } from '../views/admin.view';
import firebase from "firebase/app";
import 'firebase/database';

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
    const db = database.ref(`questions`);
    db.once('value', (data) => {
        data.forEach((question) => {
            console.log(question.child(`is_flagged`).val());
            if (question.child(`is_flagged`).val() === 'True') {
                createFlaggedDiv(question);
            }
        });
    });
}

export function revokeFlaggedQuestion() {
    database.ref(`questions/0`).update({
        is_flagged: "False"
    })
}

export function getFlaggedAnswerService() {
    const db = database.ref(`questions`);
    db.once('value', (data) => {
        data.forEach((question) => {
            database.ref(`questions/` + question.key + `/answers`).orderByChild("is_flagged").equalTo("True")
                .once('value', (answers) => {
                    answers.forEach((answer) => {
                        createFlaggedAnswerDiv(answer);
                    })
                });
        })
    });
};

export function revokeFlaggedAnswer() {
    database.ref(`questions/0/answers/0`).update({
        is_flagged: "False"
    })
}

// Asish
export function getAllUserService() {
    const url = "http://localhost:3000/users";
    let methodData = {
        method: 'GET'
    }
    fetch(url, methodData)
        .then((res) => res.json())
        .then(function (data) {
            data.map(function (user) {
                userDiv(user);
            })
        });
}

export function changeOfRole(id) {
    const url = `http://localhost:3000/users/${id}`;
    fetch(url)
        .then((resp) => resp.json())
        .then((obj) => {
            let objeuser = Object.assign({}, obj, { role: 'Admin' });
            const fetchData = {
                method: 'PUT',
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify(objeuser)
            };
            fetch(url, fetchData);
        })
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

export function isCategoryAlreadyExist(catName){
    return new Promise(function(resolve,reject){
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