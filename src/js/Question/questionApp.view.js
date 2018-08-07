import { postAnswer } from "./question.service";
import { update_questoinFlag } from "./question.service";
import { update_ansFlag } from "./question.service";
import { update_upvote } from "./question.service";
import { update_downvote } from "./question.service";


function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}


let createNode = (element) => {
    return document.createElement(element); // Create the type of element you pass in the parameters
};

let append = (parent, el) => {
    return parent.appendChild(el); // Append the second parameter(element) to the first one
};

const body = document.getElementsByTagName("body")[0];

const main = document.createElement("div");
main.className = "container";
append(body, main);

export const getQuestionView = (data) => {  //fetching data from firebase

    let qna = data;
    return qna.forEach(qnadata => {
        main.innerHTML = "";

        let question = `<span><img src="../../../src/img/question.png" alt="question" title="question" class="hvr-forward"></span>
        <span class="question badge badge-light"> <span class="badge badge-pill badge-info">Posted By:</span> ${qnadata.child('email').val()} <span class="badge badge-pill badge-info">On</span> ${qnadata.child('date').val()}</span>
        <h6>${qnadata.child('text').val()}</h6>
        <ul class="list-group question" id="question">`

        if (qnadata.child('is_flagged').val() === true)
            question += `<li class="list-group-item hvr-hang" title="Flag" id="F${qnadata.child('id').val()}">&#9873</li>`
        else
            question += `<li class="list-group-item hvr-hang" title="Flag" id="F${qnadata.child('id').val()}">&#9872</li>`

        question += `</ul>
            <hr>
        <span class="badge badge-secondary">${qnadata.child('answer_count').val()} Answers</span>`

        append(main, createHTMLElement(question));

        document.getElementById("question").addEventListener("click", function (e) {
            console.log("qflag");
        });

        //let up_vote=false

        qnadata.child('answers').forEach(element => {

            let answer = `<div class="answer">`

            if (element.child('is_correct').val() === true)
                answer += `<span><img src="../../../src/img/verified.png" alt="verified" title="Verified" class="hvr-buzz"></span>`

            answer += `<ul class="list-group" id="${element.child('id').val()}">
        <li class="list-group-item"><img src="../../../src/img/up_vote.png" alt="Like" title="Like" name="upvote" class="hvr-bounce-in" id="U${element.child('id').val()}"> +${element.child('up_vote').val()}</li>
        <li class="list-group-item"><img src="../../../src/img/down_vote.png" alt="Dislike" title="Dislike" name="downvote" class="hvr-bounce-out" id="D${element.child('id').val()}"> -${element.child('down_vote').val()}</li>`

            if (element.child('is_flagged').val() === true)
                answer += `<li class="list-group-item hvr-hang" title="Flag" name="flag" id="F${element.child('id').val()}">&#9873</li>`
            else
                answer += `<li class="list-group-item hvr-hang" title="Flag" name="flag" id="F${element.child('id').val()}">&#9872</li>`

            answer += `</ul>
        <br>
        <span class="badge badge-light"> <span class="badge badge-pill badge-info">Posted By:</span> ${element.child('email').val()} <span class="badge badge-pill badge-info">On</span> ${element.child('date').val()}</span>
        <br>
        <p>${element.child('text').val()}</p>
        </div>
        <hr>`

            append(main, createHTMLElement(answer));

            document.getElementById(element.child('id').val()).addEventListener("click", function (e) {
                if (e.target && e.target.matches("li img")) {
                    if (e.target.name === 'upvote') // checking for individual button
                        console.log("upvote" + element.child('id').val());
                    if (e.target.name === 'downvote') // checking for individual button
                        console.log("downvote" + element.child('id').val());
                }

                if (e.target && e.target.matches("li.list-group-item")) {
                    if (e.target.className === 'list-group-item hvr-hang') // checking for individual button
                        console.log("flag" + element.child('id').val());
                }
            });
        });

        // question+=`<div class="input-group">
        // <textarea id="post_answer" class="form-control" aria-label="With textarea" placeholder="Post Answer"></textarea>
        // <div class="input-group-append">
        // <button id="PB" class="btn btn-outline-secondary" type="button">Post</button>
        // </div>
        // </div>`
        getPostAnswer();
        document.getElementById("PB").addEventListener('click', postAnswer);

    });

}

export function getPostAnswer() {

    let Div = document.createElement("div"),
        Textarea = document.createElement("textarea"),
        divButton = document.createElement("div"),
        Button = document.createElement("button");

    Div.className = "input-group";
    Textarea.id = "post_answer";
    Textarea.className = "form-control";
    Textarea.placeholder = "Post Answer";
    divButton.className = "input-group-append";
    Button.id = "PB";
    Button.className = "btn btn-outline-secondary";
    Button.type = "button";
    Button.innerHTML = "Post";

    append(divButton, Button);
    append(Div, Textarea);
    append(Div, divButton);
    append(main, Div);

}
