import firebase, { auth } from 'firebase/app';
import 'firebase/auth';

import { getQuestionData } from "./question.service";
import { getQuestionView, getAnswerView, append } from "./questionApp.view";
import { getPostAnswer } from "./questionApp.view";
import { updateQFlag } from "./question.service";
import { postAnswer } from "./question.service";
import { updateAFlag } from "./question.service";
import { updateUVote } from "./question.service";
import { updateDVote } from "./question.service";
import { getVerified } from "./question.service";



export function setDom(id){
    const main = document.createElement("div");
main.className = "container";
append(document.getElementById(`questionAnswer`), main);
main.innerHTML = "";
    getQuestionData(id).then(data => { //pass question key to map data of certain question

        //QUESTION VIEW
    
        let qnadata = data;
        let Qemail = qnadata.child('email').val();
        let listenVerify = false;
    
        let questionElement = getQuestionView(data);
        questionElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.addEventListener("click", function (e) {
            updateQFlag(id);
        });
        append(main, questionElement);
    
        //ANSWERS VIEW
    
        if (firebase.auth().currentUser.email === Qemail)     //check if it is same user who posted question
            listenVerify = true;
    
        qnadata.child('answers').forEach(element => {
            let answerElement = getAnswerView(element);
    
            if (listenVerify) {
                let span = document.createElement('span');
                span.className = "tick-icon";
                span.id = 'V' + element.child('id').val();
                span.innerHTML = '&#9745';
                append(answerElement.firstElementChild, span);
    
                answerElement.firstElementChild.lastElementChild.addEventListener("click", function (e) {
                    if (e.target) {
                        let button = document.getElementById('V' + element.child('id').val());
                        button.style.color = 'green';
                        getVerified(id,element.key);
                    }
                });
            }
    
            let ul;
            if (element.child("is_correct").val() === true)
                ul = answerElement.firstElementChild.firstElementChild.nextElementSibling;
            else
                ul = answerElement.firstElementChild.firstElementChild;
    
            ul.addEventListener("click", function (e) {
                if (e.target && e.target.matches("li img")) {
                    if (e.target.name === 'upvote') // checking for individual button
                        updateUVote(id,element.key);
                    if (e.target.name === 'downvote') // checking for individual button
                        updateDVote(id,element.key);
                }
    
                if (e.target && e.target.matches("li.list-group-item")) {
                    if (e.target.className === 'list-group-item hvr-hang') // checking for individual button
                        updateAFlag(id,element.key);
                }
            });
            append(main, answerElement);
        });
    
        //POST ANSWER
    
        let postAnswerView = getPostAnswer();
        postAnswerView.firstElementChild.nextElementSibling.firstElementChild.addEventListener('click', () => {
            postAnswer(id);
        });
        append(main, postAnswerView);
    });
}





