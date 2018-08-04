import { getQuestionData,postAnswer } from "./question.service";

getQuestionData();

console.log(document.getElementById('PB'));
document.getElementById("PB").addEventListener('click', postAnswer);