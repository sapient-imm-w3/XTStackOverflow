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


function generateRandomId() {
    return Math.floor((Math.random() * 10000000000) + 1);
    }

export function postAnswer(){

    const answerContent = document.querySelector('#post_answer').value;
    console.log(answerContent);
    
    if(isNaN(answerContent)){
    var post_date = new Date();
    const datestring = post_date.toDateString();
	
    let AnsId = generateRandomId();
	
    const getUrl = 'http://localhost:3000/questions/1';
    fetch(getUrl)
    .then((resp)=>resp.json()).then(function(obj){
      const postUrl = 'http://localhost:3000/questions/1';
      let data = {
        text:answerContent,
        date:datestring,
        is_flagged:false,
        email:"tornetti@gmail.com",
        up_vote:0,
        down_vote:0,
        is_correct:false,
        id:AnsId
      }
      // data = Object.assign({up_vote:data.up_vote+1},data);
      // const object2 = Object.assign({c: 4, d: 5}, object1);
      obj.answers.push(data);
      obj.answer_count=parseInt(obj.answer_count)+1;
      const fetchData = {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(obj),
      };
      fetch(postUrl, fetchData);

      window.location.reload();
      getQuestionData();
    });
    }
    else
      alert("Write an answer!");
    
}

export const getQuestionData = () =>{
    // var getUrl = "http://localhost:3000/questions";

    // fetch(getUrl)
    //     .then((resp)=>resp.json())
    //     .then((data) =>{
    //         getQuestionView(data);
    //     })
    //     .catch((error)=> {
    //         console.log(error);
    //     });
  let db = database.ref('questions');
  db.on('value',function(data){
    getQuestionView(data);
  });
}
