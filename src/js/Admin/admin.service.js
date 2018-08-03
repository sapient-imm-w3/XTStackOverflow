import {userDiv} from "./views/admin.view";

// // export function createUser() {
// //     return new Promise(function (resolve, reject) {
// //         const url = "http://localhost:3001/users";
// //         let createNewUser = {
// //             "id": "user9",
// //             "name": "def",
// //             "role": "Normal"
// //         }
// //         let methodData = {
// //             method: 'POST',
// //             headers: {
// //                 "Content-Type": "application/json; charset=utf-8",
// //             },
// //             body: JSON.stringify(createNewUser)
// //         }
// //         fetch(url, methodData)
// //             .then((res) => res.json())
// //             .then(function (data) {
// //                 // console.log(data);
// //                 resolve(data);
// //             });
// //     })
// //  }

 export function getAllUserService() {
        const url = "http://localhost:3001/users";
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

//  export function changeOfRole(id) {
//     return new Promise(function (resolve, reject) {
//         const url = "http://localhost:3001/users/" + id;
//         let userRole = {
//             "id": "user1",
//             "name": "Xyz",
//             "role": "Normal"
//         }
//         let methodData = {
//             method: 'PUT',
//             headers: {
//                 "Content-Type": "application/json; charset=utf-8",
//             },
//             body: JSON.stringify(userRole)
//         }
//         fetch(url, methodData)
//             .then((res) => res.json())
//             .then(function (data) {
//                 // console.log(data);
//                 resolve(data);
//             });
//     })
//  }

export function changeOfRole(id) {
    const url = `http://localhost:3001/users/${id}`;
    fetch(url)
    .then((resp)=>resp.json())
    .then((obj) => {
    let obje =Object.assign({},obj,{role:'Admin'});
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
    body : JSON.stringify(obje)
    };
    fetch(url, fetchData);
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
