
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
        });
    })
}

export function revokeFlaggedQuestion(id) {
    database.ref(`questions/${id}`).update({
        is_flagged: false
    });
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
    document.getElementById('admin').innerHTML = "";
    bootstrapadmin();
}

 
export function getAllUserService() {
let db = firebase.database().ref(`/users`);
return new Promise(function (resolve){
db.on('value',(data) => {
resolve(data);
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
        return id;
    }


}
export function renderWholeCategoryView() {
    getAllCategoriesWithTopics().then(data => {
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
            let arrOfCategories = snap.val();
            resolve(arrOfCategories);
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
  
           resolve("success");
       }
     });
  })
}
export function delteCategoryFromFirebaseById(id) {
    console.log(id);
    return new Promise(function (resolve) {
        firebase.database().ref('questions').once('value',(questions) =>{
            questions.forEach(question => {
                    firebase.database().ref(`questions/${question.key}/categories`).child(id).remove();
            })
        })
        firebase.database().ref(`users`).once('value',(users) => {
            users.forEach(user => {
                firebase.database().ref(`users/${user.key}/fav_categories`).child(id).remove();
            })
        })
        firebase.database().ref().child("categories").child(id).remove();
        resolve("success");
    });
}

export function isCategoryAlreadyExist(catName){
    return new Promise(function(resolve){
        let isCategoryPresent = false;
        getAllCatFromFirebase().then((data => {
            if(data!=null){
            let arrOfKeys = Object.keys(data);
           
        for(let categoryCount = 0;categoryCount<arrOfKeys.length;categoryCount++){
            let catKey = arrOfKeys[categoryCount];
            let singleCatObj = data[catKey];
            if(singleCatObj.name == catName){
                isCategoryPresent = true;
                break;
            }
         }
        
        
       }
       resolve(isCategoryPresent);
    }));
    })
    
    }

    export function deleteUser(id){
        firebase.database().ref(`users`).child(id).remove();
        displayUsers();
    }