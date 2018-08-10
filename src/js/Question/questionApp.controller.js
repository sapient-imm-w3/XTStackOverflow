import { getQuestionData } from "./question.service";
import { getQuestionView, getAnswerView, append } from "./questionApp.view";
import { getPostAnswer } from "./questionApp.view";
import { updateQFlag } from "./question.service";
import { postAnswer } from "./question.service";
import { updateAFlag } from "./question.service";
import { updateUVote } from "./question.service";
import { updateDVote } from "./question.service";
import { getVerified } from "./question.service";


const body = document.getElementsByTagName("body")[0];

const main = document.createElement("div");
main.className = "container";
append(body, main);

main.innerHTML = "";

getQuestionData().then(data=>{

    let qnadata = data;
    let Qemail = qnadata.child('email').val();
    let listenVerify = false;
        
    let questionElement = getQuestionView(data);    
    questionElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.addEventListener("click", function (e) {
        updateQFlag(qnadata.child('id').val());
    });
    append(main,questionElement);

    if ("tannerottinger@gmail.com" === Qemail) 
        listenVerify = true;
    
    qnadata.child('answers').forEach(element => {
        let answerElement = getAnswerView(element);
                
        if (listenVerify) {
            let span = document.createElement('span');
            span.className = "tick-icon";
            span.id = 'V'+element.child('id').val();
            span.innerHTML = '&#9745';
            append(answerElement.firstElementChild,span);

            answerElement.firstElementChild.lastElementChild.addEventListener("click", function (e) {
                if (e.target) {
                    let button = document.getElementById('V' + element.child('id').val());
                    button.style.color = 'green';
                    getVerified(element.child('id').val());
                }
            });
        }
        
        let ul;
        if(element.child("is_correct").val() === true)
            ul=answerElement.firstElementChild.firstElementChild.nextElementSibling;
        else
            ul=answerElement.firstElementChild.firstElementChild;
                
        ul.addEventListener("click", function (e) {
            if (e.target && e.target.matches("li img")) {
                if (e.target.name === 'upvote') // checking for individual button
                    updateUVote(element.child('id').val());
                if (e.target.name === 'downvote') // checking for individual button
                    updateDVote(element.child('id').val());
            }

            if (e.target && e.target.matches("li.list-group-item")) {
                if (e.target.className === 'list-group-item hvr-hang') // checking for individual button
                    updateAFlag(element.child('id').val());
            }
        });
        append(main,answerElement);
    });
      
    let postAnswerView = getPostAnswer();
    postAnswerView.firstElementChild.nextElementSibling.firstElementChild.addEventListener('click', postAnswer);
    append(main, postAnswerView);  
});




