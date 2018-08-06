import { viewQuestion } from "./view";
import {database} from "../index.landing";

export function getQuestions(user){
    const db = database.ref(`questions`).orderByChild(`email`).equalTo(user.email);
        db.on('value', (questions) => {
            questions.forEach((question) => {
                viewQuestion(question);
            });
        });
}
