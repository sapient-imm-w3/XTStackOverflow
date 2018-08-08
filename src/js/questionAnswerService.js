import '../css/index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';

var firebase = require('firebase/app');
require('firebase/database');
require('firebase/firestore');

var config = {
    apiKey: "AIzaSyAyJzonRv1qbJ-T0AqwysdGCNceRbuKlk0",
    authDomain: "test-poc-115c1.firebaseapp.com",
    databaseURL: "https://test-poc-115c1.firebaseio.com",
    projectId: "test-poc-115c1",
    storageBucket: "test-poc-115c1.appspot.com",
    messagingSenderId: "790066419405"
};

var firebaseApp = firebase.initializeApp(config);
var database = firebaseApp.database();
// The Button id Pattern - U_AnsId, D_AnsId, A_AnsId,Q_QId
function getAnswerDataFromFireBaseAndUpdate(event) {
    var buttonId = (event.target || event.srcElement).id;
    buttonId = buttonId.trim();
    var index = buttonId.indexOf(buttonId.match(/\d/));
    var countType = buttonId.substring(0, index).toUpperCase();
    var ansId = buttonId.substring(index);
    // Getting data from Firebase
    // Get QuestionId here
    var questionId = 0;

    // Need to change based on Data Modal - questions/question
    var answersRef = database.ref('questions/question/');
    answersRef.once('value', (questions) => {
        var questionData = Object.values(questions.val());
        var finalData;
        questionData.forEach((ansData) => {
            var answers = ansData.answers;
            if (countType === 'Q') {
                finalData = ansData.is_flagged ? false : true;
                URL = questionId + '/is_flagged';
                answersRef.child(URL).set(finalData);
            } else {
                for (var index = 0; index < answers.length; index++) {
                    URL = questionId + '/answers/' + index;
                    if (answers[index].id == ansId) {
                        if (countType === 'U') {
                            finalData = answers[index].up_vote + 1;
                            URL += '/up_vote';
                        } else if (countType === 'D') {
                            finalData = answers[index].down_vote + 1;
                            URL += '/down_vote';
                        } else if (countType === 'A') {
                            URL += '/is_flagged';
                            finalData = answers[index].is_flagged ? false : true;
                        }
                        answersRef.child(URL).set(finalData);
                    } // If Closed for ansId
                } // For Loop Closed
            } // Else Closed
        }); // Closed questionData.forEach loop
    }); //Closed answersRef.once()
} //Function Closed 

