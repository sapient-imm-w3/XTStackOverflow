import { resolve } from "path";

export function getAllQuestions(){

}
export function getAllFlaggedQuestions(){

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
let categoryId = 100;

export function Category(name,topics){
    this.id = categoryId++;
    this.name = name;
    this.topics = topics;

}
function removeFlaggedAnswer(answerId,questionId){

}
