import createHTMLElement from '../view';

export function viewLayout() {
    let contentHTML = `
    <section id="myQuestionSection">
        <h2>Questions posted by me..!!!</h2>
        <div id="askQuestionDiv">
            <a href="#" class="text-muted" id="askQuestionButton">What's your Question ?</a>
        </div>
        <div id="myQuestionDiv"></div>
    </section>
`;

    let contentElement = createHTMLElement(contentHTML);
    contentElement.firstElementChild.nextElementSibling.firstElementChild.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("Pratik's Module");
    })
    return contentElement;

}

export function viewQuestion(question) {
    let html = `<div class="myQuestion">
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
    let htmlElement = createHTMLElement(html);
    htmlElement.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(`Govind's Module`);
    });
    return htmlElement;
}

export function noQuestions() {
    let html = `<div class="myQuestion">
                
                <div>
                    <h5 style="text-align: center;color: red;
                    font-style: italic">No Questions Posted Yet !!!</h5>
                </div>
            </div>`;
    return createHTMLElement(html);
}