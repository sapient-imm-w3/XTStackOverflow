import {auth } from '../controller';
import createHTMLElement from '../view';
import {displayCatQuestions} from './controller';

export function displaytrending(answerCount,text,date,categories,key) {
    let html = `<div class="myQuestion">
    <div class="row">
    <div id="answer-count" class="col-md-3 row text-muted text-center answerCount">
                    ${answerCount}<br>
                    answers
                </div>
                <div class="col-md-9">
                <a href="#" id="${key}">${text}</a><br>
                </div>  
                </div>  
                    </div>
                    `;
    let div = createHTMLElement(html);
    categories.forEach(element => {
        let button = `<button type="button" class="badge badge-secondary badges">${element.name}</button> &nbsp;`;
        let buttonElement = createHTMLElement(button);
        div.firstElementChild.firstElementChild.nextElementSibling.appendChild(buttonElement);
        buttonElement.addEventListener('click',() => {
            console.log(`${element.name}`);
            displayCatQuestions(`${element.name}`);
        });
});
let dates = `<small id="date" class = "text-muted" style="float: right">${date}</small>`;
    div.firstElementChild.firstElementChild.nextElementSibling.appendChild(createHTMLElement(dates));
    div.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("Govind's Module");
    });
return div;
}

export function viewLayout(){
    let main = createHTMLElement(`
    <content class="row"  id="content">
    <div  class="col-md-9" id="mainPart">
    <h3>Hello, ${auth.currentUser.displayName}</h3>
    <section id="trendingSection">
    <h2 id="trendingHeading" >Recent Posts</h2>
    <div id="trendingDiv">
    </div>
    </section>
    </div>
    </content>`);
    return main;
  }

  