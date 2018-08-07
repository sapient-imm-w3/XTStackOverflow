import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/functions';
import { getQuestionView } from "./questionApp.view";

var config = {                                                            //configuring firebase
  apiKey: "AIzaSyAHQ-G50CPi-y2l7L5r41cvKRcs0hzSFiY",
  authDomain: "stackoverflow-529e4.firebaseapp.com",
  databaseURL: "https://stackoverflow-529e4.firebaseio.com",
  projectId: "stackoverflow-529e4",
  storageBucket: "stackoverflow-529e4.appspot.com",
  messagingSenderId: "861994235915"
};

firebase.initializeApp(config);

var database = firebase.database();


function generateRandomId() {
  return Math.floor((Math.random() * 10000000000) + 1);
}

export function postAnswer() {

  const answerContent = document.querySelector('#post_answer').value;

  if (isNaN(answerContent)) {

    var post_date = new Date();
    const datestring = post_date.toDateString();
    let ans_Id = generateRandomId();

    // A post entry.
    database.ref('questions/0/answers/'+ ans_Id).set({
      
        text: answerContent,
        date: datestring,
        is_flagged: false,
        email: "tornetti@gmail.com",
        up_vote: 0,
        down_vote: 0,
        is_correct: false,
        id: ans_Id
      
    });
    var update_answer_count;

    let dbwrite = database.ref('questions/0'); 
    dbwrite.once('value',function (data){
      update_answer_count = data.child('answer_count').val()+1;
    });

    database.ref('questions/0/answer_count').set(update_answer_count);
    // var updates = {};
    // updates['/questions/0/answer_count'] = dbwrite.once('value');
    
    // database.ref().update(updates);
  // window.location.reload();
  getQuestionData();

}
  else
alert("Write an answer!");

}

export function update_upvote(){

}

export function update_downvote(){
}

export function update_ansFlag(){
}

export function update_questionFlag(){
}

export const getQuestionData = () => {

  let db = database.ref('questions');
  db.on('value', function (data) {
    getQuestionView(data);
  });
}
