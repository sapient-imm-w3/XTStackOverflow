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
        <span class="question badge badge-light"> <span class="badge badge-pill badge-info">Posted By:</span> ${qnadata.email} <span class="badge badge-pill badge-info">On</span> ${qnadata.date}</span>
        <h6>${qnadata.text}</h6>
        <ul class="list-group question" id="question">`

        if(qnadata.is_flagged === true)
            question+=`<li class="list-group-item hvr-hang" title="Flag" id="F${qnadata.id}">&#9873</li>`
        else    
            question+=`<li class="list-group-item hvr-hang" title="Flag" id="F${qnadata.id}">&#9872</li>`
        
            question+=`</ul>
            <hr>
        <span class="badge badge-secondary">${qnadata.answer_count} Answers</span>`

        append(main,createHTMLElement(question));

        document.getElementById("question").addEventListener("click",function(e) {
                console.log("qflag");
        });
        
        let up_vote=false
        qnadata.answers.forEach(element => {
            
            let answer=`<div class="answer">`

            if(element.is_correct === true)   
                answer+=`<span><img src="../../../src/img/verified.png" alt="verified" title="Verified" class="hvr-buzz"></span>`   
        
        answer+=`<ul class="list-group" id="${element.id}">
        <li class="list-group-item"><img src="../../../src/img/up_vote.png" alt="Like" title="Like" name="upvote" class="hvr-bounce-in" id="U${element.id}"> +${element.up_vote}</li>
        <li class="list-group-item"><img src="../../../src/img/down_vote.png" alt="Dislike" title="Dislike" name="downvote" class="hvr-bounce-out" id="D${element.id}"> -${element.down_vote}</li>`
        
        if(element.is_flagged === true)
            answer+=`<li class="list-group-item hvr-hang" title="Flag" name="flag" id="F${element.id}">&#9873</li>`
        else    
            answer+=`<li class="list-group-item hvr-hang" title="Flag" name="flag" id="F${element.id}">&#9872</li>`
        
        answer+=`</ul>
        <br>
        <span class="badge badge-light"> <span class="badge badge-pill badge-info">Posted By:</span> ${element.email} <span class="badge badge-pill badge-info">On</span> ${element.date}</span>
        <br>
        <p>${element.text}</p>
        </div>
        <hr>`

        append(main,createHTMLElement(answer));

        document.getElementById(element.id).addEventListener("click",function(e) {
            if (e.target && e.target.matches("li img")) {
                if(e.target.name === 'upvote') // checking for individual button
                    console.log("upvote");
                if(e.target.name === 'downvote') // checking for individual button
                    console.log("downvote");
                }
            
            if (e.target && e.target.matches("li.list-group-item")) {
                if(e.target.className === 'list-group-item hvr-hang') // checking for individual button
                        console.log("flag");
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
