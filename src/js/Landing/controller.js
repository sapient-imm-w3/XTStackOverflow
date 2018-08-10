import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { createModal, displayFavCategories } from "./Authentication/view";
import $ from 'jquery';
import triggerTrending from './Trending/controller';
import triggerMyQuestions from './MyQuestions/controller';
import triggerRecommended from './Recommended/controller';
import {setup,getUser,getCategories} from './Authentication/service';

let config = {
    apiKey: "AIzaSyB27dZKtJ8xCD38hyNjtwfp5DCn14axl8s",
    authDomain: "sweetymedhu-9e71e.firebaseapp.com",
    databaseURL: "https://sweetymedhu-9e71e.firebaseio.com",
    projectId: "sweetymedhu-9e71e",
    storageBucket: "sweetymedhu-9e71e.appspot.com",
    messagingSenderId: "682645099129"
  };

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();

setup().then((currentUser)=>{
    getUser(currentUser).then(
        (user) => {
            if (user.val() == null) {
                getCategories().then((categories) => {
                    document.body.appendChild(createModal());
                    categories.forEach(category => {
                    document.getElementById(`modalBody`).appendChild(displayFavCategories(category));
                });
                $('#exampleModalLong').modal('show');
                document.getElementById(`saveCategories`).onclick = () => {
                   document.body.appendChild(displayPage(currentUser));
                }
                });
        }else{
            if(user.child(`role`).val()==="normal"){
                console.log(displayPage(currentUser));
                document.body.appendChild(displayPage(currentUser));
                //return displayPage(currentUser);
            }
        }
});
});

function displayPage(currentUser){
    let content = triggerTrending();
    let myQuestionSection = triggerMyQuestions(currentUser); // Append in mainPart
    let div = triggerRecommended(currentUser); // Append in content
    content.firstElementChild.appendChild(myQuestionSection);
    content.appendChild(div);
    return content;
}

//Appending element for a new user in updateCategories function..!!!
//Maybe writing a different function which returns a single DOM element..!!!