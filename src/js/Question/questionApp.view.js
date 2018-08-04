import { postAnswer } from "./question.service";

function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
  }


  let createNode = (element) =>{
    return document.createElement(element); // Create the type of element you pass in the parameters
};

let append = (parent, el) =>{
    return parent.appendChild(el); // Append the second parameter(element) to the first one
};

const main = document.getElementById("container");

export const getQuestionView = (data) =>{

    let qna = data;
    return qna.map((qnadata) =>{
       main.innerHTML="";
        
        let question = `<span><img src="../../../src/img/question.png" alt="question" title="question" class="hvr-forward"></span>
        <h6>${qnadata.text}</h6>
        <ul class="list-group question">`

        if(qnadata.is_flagged === true)
            question+=`<li class="list-group-item hvr-hang" title="Flag">&#9873</li>`
        else    
            question+=`<li class="list-group-item hvr-hang" title="Flag">&#9872</li>`
        
            question+=`</ul>
            <hr>
        <span class="badge badge-pill badge-secondary">Answers</span>`
        
        qnadata.answers.forEach(element => {
            question+=`<div class="answer">`

            if(element.is_correct === true)   
                question+=`<span><img src="../../../src/img/verified.png" alt="verified" title="Verified" class="hvr-buzz"></span>`   
        
        question+=`<ul class="list-group">
        <li class="list-group-item"><img src="../../../src/img/up_vote.png" alt="Like" title="Like" class="hvr-bounce-in"> +${element.up_vote}</li>
        <li class="list-group-item"><img src="../../../src/img/down_vote.png" alt="Dislike" title="Dislike" class="hvr-bounce-out"> -${element.down_vote}</li>`
        
        if(element.is_flagged === true)
            question+=`<li class="list-group-item hvr-hang" title="Flag">&#9873</li>`
        else    
            question+=`<li class="list-group-item hvr-hang" title="Flag">&#9872</li>`
        
        question+=`</ul>
        <br>
        <span class="badge badge-light">Posted By: ${element.email}</span>
        <br>
        <p>${element.text}</p>
        </div>
        <hr>`
        });

        append(main,createHTMLElement(question));

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

     const body =  document.getElementsByTagName("body");

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

            append(divButton,Button);
            append(Div,Textarea);
            append(Div,divButton);
            append(main,Div);
            
}