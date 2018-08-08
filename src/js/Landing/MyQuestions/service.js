import { viewQuestion, noQuestions } from "./view";
import {database} from "../controller";
import createHTMLElement from '../view';

export function getQuestions(user){
    const db = database.ref(`questions`).orderByChild(`email`).equalTo(user.email);
        db.on('value', (questions) => {
            if(questions.numChildren()===0){
                noQuestions();
            }else {
                questions.forEach((question) => {
                viewQuestion(question);
                });
            }
            
        });
}
