import createHTMLElement from '../view';
import { getAllFromDB } from './service';

let html = `<div id="flex-container">
           
</div>`;

// document.body.appendChild(createHTMLElement(html));
// document.getElementById("Add").onclick = function () {
//     getAllFromDB();
// };


export function displaytrending(answerCount,text,date) {
    let html = `<div class="flex-container">
    <div id= "answer-count" style="flex-grow: 1;line-height: 1;">
                    <span>${answerCount}</span><br>
                    <span>answers</span>
                </div>
                <div id="question" style="flex-grow: 8">
    ${text}
   <br> <small id="date" style="font-size: 20px; float: right">${date}</small>
</div>
<hr>    
    </div>
    `;
//     let html2 = `<div id= "answer-count" style="flex-grow: 1;line-height: 1;">
//                     <span>${answerCount}</span><br>
//                     <span>answers</span>
//                 </div>`;
//     let html3 = `<div id="question" style="flex-grow: 8">
//     ${text}
//    <br> <small id="date" style="font-size: 20px; float: right">${date}</small>
// </div> `
    document.getElementById("trending").appendChild(createHTMLElement(html));
    
}