import { viewQuestion } from "./view";
import {database} from "../controller";
import createHTMLElement from '../view';

export function getQuestions(user){
    const db = database.ref(`questions`).orderByChild(`email`).equalTo(user.email);
    console.log(db);
        db.on('value', (questions) => {
            console.log(questions.numChildren());
            if(questions.numChildren()===0){
                let html = `<div class="myQuestion">
                
                <div>
                    <h5 style="text-align: center;">No Questions Posted Yet !!!</h5>
                </div>
            </div>`;
                document.getElementById(`myQuestionDiv`).appendChild(createHTMLElement(html));
            }else {
                questions.forEach((question) => {
                console.log(question + " hello");
                viewQuestion(question);
                });
            }
            
        });
}
