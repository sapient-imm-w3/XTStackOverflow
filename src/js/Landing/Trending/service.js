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
export function getCatQuestions(category) {
    document.getElementById(`trendingDiv`).innerHTML = "";
const dbq = database.ref(`questions`);
  dbq.on('value', (questions) => {
        let count = 0;
        questions.forEach((question) => {
          if (count < 5) {
            question.child(`categories`).val().forEach((cat) => {
              if (cat.name === category) {
                displaytrending(question.child(`answer_count`).val(),question.child(`text`).val(),question.child(`date`).val(),question.child(`categories`).val(),question.key);
                count++;
              }
            })
          }
        })
  });
}