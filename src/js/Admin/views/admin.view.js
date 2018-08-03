import $ from 'jQuery';
import { revokeFlaggedQuestion } from '../services/admin.service';
export function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}
export function createFlaggedDiv(question) {
    const flaggedDiv = createHTMLElement(
        `
        <div id="" class="flaggedquestion">
        <div class="row">
        <div class="col-md-3 row text-muted text-center flagCount">
        <div class="col-md-9">${question.flag_count}
        <br> flags
        </div>
        </div>
        <div class="col-md-6">
        <a href="#">${question.text}</a>
        </div>
        <button type="button" class="btn btn-warning" id="${question.id}">Revoke Flag</button>
        </div>
        </div> 
    `
    )
    document.getElementById("flagged_questions").appendChild(flaggedDiv);
    document.getElementById(`${question.id}`).onclick = () =>{
        revokeFlaggedQuestion(`${question.id}`);
    }
    
} 

