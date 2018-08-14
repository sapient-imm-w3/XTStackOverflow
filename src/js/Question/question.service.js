import firebase from 'firebase';
import 'firebase/auth';

import 'firebase/database/dist/index.cjs';
import 'firebase/functions/dist/index.cjs';
import { getAnswerView } from './questionApp.view';
import { getQuestionView } from "./questionApp.view";
import { setDom } from './questionApp.controller';


var database = firebase.database();

export function postAnswer(id) {

  const answerContent = document.querySelector('#post_answer').value;

  if (isNaN(answerContent)) {

    var post_date = new Date();
    const datestring = post_date.toDateString();

    database.ref(`questions/${id}/answers/`).push({ 
        text: answerContent,
        date: datestring,
        is_flagged: false,
        email: firebase.auth().currentUser.email,
        up_vote: 0,
        down_vote: 0,
        is_correct: false,
        flag_count : 0,
        photoUrl : firebase.auth().currentUser.photoURL      
    });
    var update_answer_count;

    let dbwrite = database.ref(`questions/${id}`); 
    dbwrite.once('value',function (data){
      update_answer_count = data.child('answer_count').val()+1;
    });

    database.ref(`questions/${id}/answer_count`).set(update_answer_count);
    
  
  getQuestionData().then(data=>{
    getQuestionView(data);
    getAnswerView(data);    
});

document.getElementById(`questionAnswer`).innerHTML = "";
setDom(id);
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
  
  database.ref(`questions/${qsnId}/answers/`+id+'/is_correct').set(flag);
  document.getElementById(`questionAnswer`).innerHTML = "";
  setDom(qsnId);
}

export function updateUVote(qsnId,id){
  let upvote;
  let vote = database.ref(`questions/${qsnId}/answers/`+id);
  vote.once('value',function(data){
      upvote = data.child('up_vote').val();
  })
  database.ref(`questions/${qsnId}/answers/`+id).update({
    "up_vote" : upvote+1
  });
  document.getElementById(`questionAnswer`).innerHTML = "";
  setDom(qsnId);
}

export function updateDVote(qsnId,id){
  let downvote;
  let vote = database.ref(`questions/${qsnId}/answers/`+id);
  vote.once('value',function(data){
      downvote = data.child('down_vote').val();
  })
  database.ref(`questions/${qsnId}/answers/`+id+'/down_vote').set(downvote+1);
  document.getElementById(`questionAnswer`).innerHTML = "";
  setDom(qsnId);
}

export function updateAFlag(qsnId,id){
  let flag=false;
  let flagCount;

  let dbwrite = database.ref(`questions/${qsnId}/answers/`+id); 
  dbwrite.once('value',function (data){
  flagCount = data.child('flag_count').val();
    
    if(data.child('is_flagged').val() === false){
        flag=true;
        flagCount += 1;}
    else{
        flag=false;    
        flagCount -= 1;}
  });

  database.ref(`questions/${qsnId}/answers/`+id).update({
    "is_flagged": flag,
    "flag_count": flagCount
  });
  document.getElementById(`questionAnswer`).innerHTML = "";
  setDom(qsnId);
}

export function updateQFlag(id){
  let flag=false;
  let flagCount;

  let dbwrite = database.ref(`questions/${id}`); 
  dbwrite.once('value',function (data){
  flagCount = data.child('flag_count').val();

    if(data.child('is_flagged').val() === false){
        flag=true;
        flagCount += 1;}
    else{
        flag=false; 
        flagCount -=1;}   
  });

  database.ref(`questions/${id}`).update({
    "is_flagged": flag,
    "flag_count": flagCount
  });
  document.getElementById(`questionAnswer`).innerHTML = "";
  setDom(id);
}

export const getQuestionData = (id) => {
  let db = database.ref(`questions/${id}`);

  return new Promise(function(resolve,reject){
       db.on('value', function (data) {
      resolve(data);
    });
   })
 
}