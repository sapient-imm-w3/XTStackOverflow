
import triggerTrending from './Trending/controller';
import triggerMyQuestions from './MyQuestions/controller';
import triggerRecommended from './Recommended/controller';


let config = {
    apiKey: "AIzaSyB27dZKtJ8xCD38hyNjtwfp5DCn14axl8s",
    authDomain: "sweetymedhu-9e71e.firebaseapp.com",
    databaseURL: "https://sweetymedhu-9e71e.firebaseio.com",
    projectId: "sweetymedhu-9e71e",
    storageBucket: "sweetymedhu-9e71e.appspot.com",
    messagingSenderId: "682645099129"
  };

firebase.initializeApp(config);

let provider = new firebase.auth.GoogleAuthProvider();
           
firebase.auth().signInWithPopup(provider).then(function(result) {
 let user = result.user;
 triggerTrending();
 triggerMyQuestions(user);
 triggerRecommended();
}).catch(function(error) {
    console.log(error.code + error.message + error.email + error.credential );
});

export const database = firebase.database();

