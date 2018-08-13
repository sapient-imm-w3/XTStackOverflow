import firebase from 'firebase';
import 'firebase/auth';

import 'firebase/database/dist/index.cjs';
import 'firebase/functions/dist/index.cjs';
import { getAnswerView } from './questionApp.view';
import { getQuestionView } from "./questionApp.view";

// var config = {                                                            //configuring firebase
//   apiKey: "AIzaSyAHQ-G50CPi-y2l7L5r41cvKRcs0hzSFiY",
//   authDomain: "stackoverflow-529e4.firebaseapp.com",
//   databaseURL: "https://stackoverflow-529e4.firebaseio.com",
//   projectId: "stackoverflow-529e4",
//   storageBucket: "stackoverflow-529e4.appspot.com",
//   messagingSenderId: "861994235915"
// };

// firebase.initializeApp(config);

var database = firebase.database();

export function postAnswer(id) {

  const answerContent = document.querySelector('#post_answer').value;

  if (isNaN(answerContent)) {

    var post_date = new Date();
    const datestring = post_date.toDateString();

    // A post entry.
    database.ref(`questions/${id}/answers/`).push({ 
        text: answerContent,
        date: datestring,
        is_flagged: false,
        email: firebase.auth().currentUser.email,
        up_vote: 0,
        down_vote: 0,
        is_correct: false      
    });
    var update_answer_count;

    let dbwrite = database.ref(`questions/${id}`); 
    dbwrite.once('value',function (data){
      update_answer_count = data.child('answer_count').val()+1;
    });

    database.ref(`questions/${id}/answer_count`).set(update_answer_count);
    // var updates = {};
    // updates['/questions/0/answer_count'] = dbwrite.once('value');
    
    // database.ref().update(updates);
  
  getQuestionData().then(data=>{
    getQuestionView(data);
    getAnswerView(data);    
});

window.location.reload();

}
  else
alert("Write an answer!");

}
let check =false;

export function getVerified(qsnId,id){
  let flag=false;
  
  let tick = database.ref(`questions/${qsnId}/answers/`+id);
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
  window.location.reload();
}

export function updateUVote(qsnId,id){
  let upvote;
  let vote = database.ref(`questions/${qsnId}/answers/`+id);
  vote.once('value',function(data){
      upvote = data.child('up_vote').val();
  })
  database.ref(`questions/${qsnId}/answers/`+id+'/up_vote').set(upvote+1);
  window.location.reload();
}

export function updateDVote(qsnId,id){
  let downvote;
  let vote = database.ref(`questions/${qsnId}/answers/`+id);
  vote.once('value',function(data){
      downvote = data.child('down_vote').val();
  })
  database.ref(`questions/${qsnId}/answers/`+id+'/down_vote').set(downvote+1);
  window.location.reload();
}

export function updateAFlag(qsnId,id){
  let flag=false;
  let dbwrite = database.ref(`questions/${qsnId}/answers/`+id); 
  dbwrite.once('value',function (data){
    
    if(data.child('is_flagged').val() === false)
        flag=true;
    else
        flag=false;    
  });

  database.ref(`questions/${qsnId}/answers/`+id+'/is_flagged').set(flag);
  window.location.reload();
}

export function updateQFlag(id){
  let flag=false;

  let dbwrite = database.ref(`questions/${id}`); 
  dbwrite.once('value',function (data){
    
    if(data.child('is_flagged').val() === false)
        flag=true;
    else
        flag=false;    
  });

  database.ref(`questions/${id}/is_flagged`).set(flag);
  window.location.reload();
}

export const getQuestionData = (id) => {
  let db = database.ref(`questions/${id}`);

  return new Promise(function(resolve,reject){
       db.on('value', function (data) {
      resolve(data);
    });
   })
 
}