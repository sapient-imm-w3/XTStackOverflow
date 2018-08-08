import { displayFavCategories } from './view';
import { database, auth } from './controller';
import triggerTrending from './Trending/controller';
import triggerMyQuestions from './MyQuestions/controller';
import triggerRecommended from './Recommended/controller';
import firebase from "firebase/app";

export function setup() {
    let provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(function (result) {
        let currentUser = auth.currentUser;
        getUser(currentUser);
    }).catch(function (error) {
        console.log(error.code + error.message + error.email + error.credential);
    });

}

export function getFavCategories() {
    const db = database.ref(`categories`);
    db.on('value', (data) => {
        displayFavCategories(data);
    });
}

export function updateCategories(favourite) {
    let currentUser = auth.currentUser;
    database.ref(`users/` + user.uid).set({
        name: user.displayName,
        email: user.email,
        role: "normal",
        fav_categories: favourite
    });
    triggerTrending();
    triggerMyQuestions(currentUser);
    //triggerRecommended(user);
}

export function getUser(currentUser) {
    const db = database.ref(`users/` + currentUser.uid);
    db.once('value', (user) => {
        if (user.val() == null) {
            getFavCategories();
        } else {
            if (user.child(`role`).val() === "normal") {
                triggerTrending();
                triggerMyQuestions(currentUser);
                // triggerRecommended(user);
            } else if (user.child(`role`).val() === "admin") {
                console.log("Admin Page"); // Redirect to Srikar's Module
            }
        }
    })
}