import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../css/layout.css'
import '../css/module.css'
import '../css/index.css';
import '../css/hover-min.css';


// Landing Page Imports
import {setup,getUser,getCategories} from './Landing/Authentication/service';
import { createModal, displayFavCategories } from './Landing/Authentication/view';
import triggerTrending from './Landing/Trending/controller';
import triggerMyQuestions from './Landing/MyQuestions/controller';
import triggerRecommended from './Landing/Recommended/controller';

// Admin Page Imports
import  bootstrapadmin  from  "./Admin/index.Admin"
// Question Answer

// Ask Question Imports 

// import 

import './firebase.database';

export function bootstrap () {

    setup().then((currentUser)=>{
        getUser(currentUser).then(
            (user) => {
                if (user.val() == null) {
      
                    getCategories().then((categories) => {
                        document.getElementById('landing').appendChild(createModal());
                        categories.forEach(category => {
                        document.getElementById(`modalBody`).appendChild(displayFavCategories(category));
                    });
                    $('#exampleModalLong').modal('show');
                    document.getElementById(`saveCategories`).onclick = () => {
                        document.getElementById('landing').appendChild(displayPage(currentUser));
                    }
                    });
            }else{
                if(user.child(`role`).val()==="normal"){
                    document.getElementById('landing').appendChild(displayPage(currentUser));
                }else if(user.child('role').val() === "Admin") {
                    bootstrapadmin();
                }
            }
      });
      });
}
export function displayPage(currentUser){
    let content = triggerTrending();
    let myQuestionSection = triggerMyQuestions(currentUser); // Append in mainPart
    let div = triggerRecommended(currentUser); // Append in content
    content.firstElementChild.appendChild(myQuestionSection);
    content.appendChild(div);
    return content;
  }

document.getElementById('home').onclick = (event) => {
    event.preventDefault();
    document.getElementById(`askQuestion`).innerHTML = "";
    document.getElementById(`questionAnswer`).innerHTML = "";
    document.getElementById(`landing`).innerHTML = "";
    document.getElementById('landing').appendChild(displayPage(firebase.auth().currentUser));
}