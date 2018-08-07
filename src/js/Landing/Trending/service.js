import { displaytrending } from './views';
import {database} from "../controller";

export function getAnswerCountFromDB() {
        const db = database.ref(`questions`).limitToLast(5);
        db.on('value', (data) => {
            data.forEach((question) => {
                displaytrending(question.child(`answer_count`).val(),question.child(`text`).val(),question.child(`date`).val(),question.child(`categories`).val(),question.key);
            });
        });
}