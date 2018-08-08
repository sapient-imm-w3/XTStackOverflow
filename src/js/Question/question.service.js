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
let check =false;

export function getVerified(id){
  let flag=false;
  
  let tick = database.ref('questions/0/answers/'+id);
  tick.once('value',function(data){
    if(data.child('is_correct').val() === false && check === false){
      flag=true;
      check=true;
    }
    else{
      flag=false; 
      check=false;
    }   
  });
  
  database.ref('questions/0/answers/'+id+'/is_correct').set(flag);
}

export function updateUVote(id){
  let upvote;
  let vote = database.ref('questions/0/answers/'+id);
  vote.once('value',function(data){
      upvote = data.child('up_vote').val();
  })
  database.ref('questions/0/answers/'+id+'/up_vote').set(upvote+1);
}

export function updateDVote(id){
  let downvote;
  let vote = database.ref('questions/0/answers/'+id);
  vote.once('value',function(data){
      downvote = data.child('down_vote').val();
  })
  database.ref('questions/0/answers/'+id+'/down_vote').set(downvote+1);
}

export function updateAFlag(id){
  let flag=false;

  let dbwrite = database.ref('questions/0/answers/'+id); 
  dbwrite.once('value',function (data){
    
    if(data.child('is_flagged').val() === false)
        flag=true;
    else
        flag=false;    
  });

  database.ref('questions/0/answers/'+id+'/is_flagged').set(flag);
}

export function updateQFlag(id){
  let flag=false;

  let dbwrite = database.ref('questions/0'); 
  dbwrite.once('value',function (data){
    
    if(data.child('is_flagged').val() === false)
        flag=true;
    else
        flag=false;    
  });

  database.ref('questions/0/is_flagged').set(flag);
}

export const getQuestionData = () => {

  let db = database.ref('questions');
  db.on('value', function (data) {
    getQuestionView(data);
    return data
  });
}
