// import firebase from 'firebase/app';
// import 'firebase/auth';
// firebase.auth().currentUser.email;

export let append = (parent, el) => {
    return parent.appendChild(el); // Append the second parameter(element) to the first one
};

let createElement = (element) =>{
    let domElement = document.createElement('div');
    domElement.innerHTML = element;  
    return domElement;
}

export const getQuestionView = (data) => {  //fetching data from firebase
    // console.log(data.val());
    let qnadata = data;
    
        let question = `<span><img src="../../../src/img/question.png" alt="question" title="question" class="hvr-forward"></span>
        <span class="question badge badge-light"> <span class="badge badge-pill badge-info">Posted By:</span> ${qnadata.child('email').val()} <span class="badge badge-pill badge-info">On</span> ${qnadata.child('date').val()}</span>
        <h6>${qnadata.child('text').val()}</h6>
        <ul class="list-group question" id="question">`

        if (qnadata.child('is_flagged').val() === true)
            question += `<li class="list-group-item hvr-hang" title="Flag" id="F${qnadata.child('id').val()}">&#9873</li>`
        else
            question += `<li class="list-group-item hvr-hang" title="Flag" id="F${qnadata.child('id').val()}">&#9872</li>`

        question += `</ul>
            <hr>`

        if (qnadata.child('answer_count').val() > 0)
            question += `<span class="badge badge-secondary">${qnadata.child('answer_count').val()} Answers</span><hr>`
        else
            question += `<span class="badge badge-secondary">Be The First To Post An Answer!</span><hr>`

        //append(main, createHTMLElement(question));
        let questionElement = createElement(question);
        
        return questionElement;
       
}
        //ende question string here!!!
export const getAnswerView = (element) => {
    //accessing each answer
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

            let answerElement = createElement(answer);
            // console.log(answerElement);  ANSWER ELEMENTS
            return answerElement;  
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
    return Div;
}