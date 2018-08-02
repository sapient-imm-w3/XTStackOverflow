import {resolve} from "path";

// export function createUser() {
//     return new Promise(function (resolve, reject) {
//         const url = "http://localhost:3001/users";
//         let createNewUser = {
//             "id": "user9",
//             "name": "def",
//             "role": "Normal"
//         }
//         let methodData = {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json; charset=utf-8",
//             },
//             body: JSON.stringify(createNewUser)
//         }
//         fetch(url, methodData)
//             .then((res) => res.json())
//             .then(function (data) {
//                 // console.log(data);
//                 resolve(data);
//             });
//     })
//  }

 export function getAllUsers() {
    return new Promise(function (resolve, reject) {
        const url = "http://localhost:3001/users";
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

 export function changeOfRole(id) {
    return new Promise(function (resolve, reject) {
        const url = "http://localhost:3001/users/" + id;
        let userRole = {
            "id": "user1",
            "name": "Xyz",
            "role": "Normal"
        }
        let methodData = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(userRole)
        }
        fetch(url, methodData)
            .then((res) => res.json())
            .then(function (data) {
                // console.log(data);
                resolve(data);
            });
    })
 }

 export function getFlaggedAnswers() {
    return new Promise(function (resolve, reject) {
        const url = "http://localhost:3001/flagged";
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
