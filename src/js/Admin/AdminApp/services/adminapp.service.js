import { resolve } from "path";
import {renderCategoryView} from '../views/adminapp.view'
//https://codepen.io/gabrieleromanato/pen/Jgoab
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
        const url = "http://localhost:3004/categories";
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
        //const url = "http://localhost:3004/categories?_embed=topics";
        const url = "http://localhost:3004/categories";
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
/*
export function getAllCategories1() {
  let allCatData = null;
        const url = "http://localhost:3004/categories";
        let methodData = {
            method: 'GET'
        }
        fetch(url, methodData)
            .then((res) => res.json())
            .then(function (data) {
                console.log(data);
                allCatData = data;
             });
       return allCatData;     
 }
 */

export function getCategoryById(id) {
    return new Promise(function (resolve, reject) {
        const url = "http://localhost:3004/categories/" + id;
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
        const url = "http://localhost:3004/categories/" + id;
        let methodData = {
            method: 'DELETE'
        }
        fetch(url, methodData)
            .then((res) => res.json())
            .then(function (data) {
                // console.log(data);
                resolve(data);
            });
    })
}
export function createCategory(_categoryObj) {
    return new Promise(function (resolve, reject) {
        const url = "http://localhost:3004/categories";
        /*
        let categoryObj = {
            "id": _categoryObj.id,
            "name": _categoryObj.name,
            "topics": JSON.stringify(_categoryObj.topics)
        }
        */
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

export function updateCategory(id) {
    return new Promise(function (resolve, reject) {
        const url = "http://localhost:3004/categories/" + id;
        let categoryObj = {
            "id": "1",
            "name": "Ashish",
            "topics": [
                {
                    "id": "topic3",
                    "topic-name": "overloading"
                },
                {
                    "id": "topic4",
                    "topic-name": "overriding"
                }
            ]
        }
        let methodData = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(categoryObj)
        }
        fetch(url, methodData)
            .then((res) => res.json())
            .then(function (data) {
                // console.log(data);
                resolve(data);
            });
    })
}
let categoryId = 500;

export function Category(name){
    this.id = new IDGenerator().generate();
    this.name = name;
    //this.topics = topics;

}
let topicId = 300;
export function Topic(name,_categoryId){
this.id = topicId++;
this.name = name;
this.categoryId = _categoryId;
}
export function createTopic(_topicObj) {
    return new Promise(function (resolve, reject) {
        const url = "http://localhost:3004/topics";
        /*
        let categoryObj = {
            "id": _categoryObj.id,
            "name": _categoryObj.name,
            "topics": JSON.stringify(_categoryObj.topics)
        }
        */
       //console.log(JSON.stringify(_topicObj));
        let methodData = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(_topicObj)
        }
        fetch(url, methodData)
            .then((res) => res.json())
            .then(function (data) {
                console.log(data);
                resolve(data);
            });
    })
}
export function deleteTopicById(id) {
    return new Promise(function (resolve, reject) {
        const url = "http://localhost:3004/topics/" + id;
        let methodData = {
            method: 'DELETE'
        }
        fetch(url, methodData)
            .then((res) => res.json())
            .then(function (data) {
                // console.log(data);
                resolve(data);
            });
    })
}