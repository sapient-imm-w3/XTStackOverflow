import {createFlaggedDiv,userDiv,renderCategoryView} from '../views/admin.view';
import firebase from "firebase/app";
import 'firebase/database';
import { resolve } from "path";

export function getFlaggedQuestionService() {
    const url = 'http://localhost:3000/questions?is_flagged=True';
    fetch(url, {
      method: 'GET'
    })
      .then(resp => resp.json())
      .then((data) => {
        return data.map((question) => {
          createFlaggedDiv(question);
        });
      });
  }

  export function revokeFlaggedQuestion(id) {   
    const revokeUrl = `http://localhost:3000/questions/${id}`;
    fetch(revokeUrl)
    .then((resp)=>resp.json())
    .then((obj) => {
      let obje  =Object.assign({},obj,{is_flagged:'false'});
      const fetchData = {
        method: 'PUT',
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body : JSON.stringify(obje)
      };
      fetch(revokeUrl, fetchData);
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
           data.map(function(user){
              userDiv(user);
          })  
      });
}

export function changeOfRole(id) {
const url = `http://localhost:3000/users/${id}`;
fetch(url)
.then((resp)=>resp.json())
.then((obj) => {
let objeuser =Object.assign({},obj,{role:'Admin'});
const fetchData = {
method: 'PUT',
mode: "cors", // no-cors, cors, *same-origin
cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
credentials: "same-origin", // include, same-origin, *omit
headers: {
"Content-Type": "application/json; charset=utf-8",
// "Content-Type": "application/x-www-form-urlencoded",
},
redirect: "follow", // manual, *follow, error
referrer: "no-referrer", // no-referrer, *client
body : JSON.stringify(objeuser)
};
fetch(url, fetchData);
})
} 

//Tejeswar

function IDGenerator() {
	 
  this.length = 8;
  this.timestamp = +new Date;
  
  var _getRandomInt = function( min, max ) {
     return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }
  
  this.generate = function() {
      var ts = this.timestamp.toString();
      var parts = ts.split( "" ).reverse();
      var id = "";
      
      for( var i = 0; i < this.length; ++i ) {
         var index = _getRandomInt( 0, parts.length - 1 );
         id += parts[index];	 
      }
      console.log();
      return id;
  }

  
}
export function getAllCategories() {
  return new Promise(function (resolve, reject) {
      const url = "http://localhost:3000/categories";
      let methodData = {
          method: 'GET'
      }
      fetch(url, methodData)
          .then((res) => res.json())
          .then(function (data) {
              //console.log(data);
             
              resolve(data);

          });
  })
}
export function renderWholeCategoryView(){
  getAllCategoriesWithTopics().then(data => {
      console.log(data);
      renderCategoryView(data);
  });
}

export function getAllCategoriesWithTopics() {
  return new Promise(function (resolve, reject) {
      const url = "http://localhost:3000/categories";
      let methodData = {
          method: 'GET'
      }
      fetch(url, methodData)
          .then((res) => res.json())
          .then(function (data) {
             
              resolve(data);

          });
  })
}

export function getCategoryById(id) {
  return new Promise(function (resolve, reject) {
      const url = "http://localhost:3000/categories/" + id;
      let methodData = {
          method: 'GET'
      }
      fetch(url, methodData)
          .then((res) => res.json())
          .then(function (data) {
              // console.log(data);
              resolve(data);
          });
  })
}

export function deleteCategoryById(id) {
  return new Promise(function (resolve, reject) {
      const url = "http://localhost:3000/categories/" + id;
      let methodData = {
          method: 'DELETE'
      }
      fetch(url, methodData)
          .then((res) => res.json())
          .then(function (data) {
              resolve(data);
          });
  })
}
export function createCategory(_categoryObj) {
  return new Promise(function (resolve, reject) {
      const url = "http://localhost:3000/categories";
     console.log(JSON.stringify(_categoryObj));
      let methodData = {
          method: 'POST',
          headers: {
              "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(_categoryObj)
      }
      fetch(url, methodData)
          .then((res) => res.json())
          .then(function (data) {
              console.log(data);
              resolve(data);
          });
  })
}

export function Category(name){
  this.id = new IDGenerator().generate();
  this.name = name;

}
export function getAllCatFromFirebase(){
    return new Promise(function (resolve, reject) {
    let refToCategories = firebase.database().ref().child("categories");
    refToCategories.on("value",function(snap) {
        console.log("Inside listener");
        let arrOfCategories = snap.val();
        //renderCategoryView(arrOfCategories);
        resolve(arrOfCategories);
  console.log("length of categories:"+arrOfCategories);
    });
})
}
export function insertCategoryToFirebase(_categoryObj){
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
export function delteCategoryFromFirebaseById(id){
    return new Promise(function (resolve, reject) {
        firebase.database().ref().child("categories").child(id).remove();
        resolve("success");
    });
}

    