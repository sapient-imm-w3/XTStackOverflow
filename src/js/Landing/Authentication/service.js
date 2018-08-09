import {database,auth} from '../controller';
import firebase from 'firebase/app';

export function setup() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return new Promise((resolve,reject) => {
        auth.signInWithPopup(provider).then(function (result) {
            let currentUser = auth.currentUser;
            resolve(currentUser);
        }).catch(function (error) {
            console.log(error.code + error.message + error.email + error.credential);
        });
    })
} // calls getUser method to check new User or existing User

export function getUser(currentUser) {
    const db = database.ref(`users/` + currentUser.uid);
    return new Promise((resolve,reject)=>{
        db.once('value', (user) => {
            resolve(user);
    })
    });
  
}

export function updateCategories(favourite) {
    let currentUser = auth.currentUser;
    database.ref(`users/` + currentUser.uid).set({
        name: currentUser.displayName,
        email: currentUser.email,
        role: "normal",
        fav_categories: favourite
    });
}


export function getCategories(){
    return new Promise((resolve,reject) => {
        const db = database.ref(`categories`);
        db.on('value', (data) => {
        resolve(data);
    });
    });
}