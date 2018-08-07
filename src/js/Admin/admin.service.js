import {userDiv} from "./views/admin.view";
import firebase from "firebase/app";
import 'firebase/database'

export function getAllUserService() {
    let db = firebase.database().ref(`/users`);
    db.on('value',(data) => {
        userDiv(data);   
    });
}


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
    


