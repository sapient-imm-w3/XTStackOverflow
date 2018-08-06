import createHTMLElement from '../view';

export function viewLayout(){
   // document.body.innerHTML = "";
    let content = `
    <section id="myQuestionSection">
        <h2>Questions posted by me..!!!</h2>
        <div id="askQuestionDiv">
            <a href="#" class="text-muted" id="askQuestionButton">What's your Question ?</a>
        </div>
        <div id="myQuestionDiv"></div> 
    </section>
`
document.getElementById(`mainPart`).appendChild(createHTMLElement(content));
}

export function viewQuestion(question){
    const myQuestionDiv = document.getElementById(`myQuestionDiv`);
    let html = `<div id="" class="myQuestion">
    <div class="row">
        <div class="col-md-3 row text-muted text-center answerCount">
            <div class="col-md-6"> ${question.child(`answer_count`).val()}
                <br> answers
            </div>
            <div class="col-md-6"> ${question.child(`flag_count`).val()}
                <br> flags
            </div>
        </div>
        <div class="col-md-9">
            <a href="#">${question.child(`text`).val()}</a>
        </div>
    </div>
</div>`;
myQuestionDiv.appendChild(createHTMLElement(html));
}
