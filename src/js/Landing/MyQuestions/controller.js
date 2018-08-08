import { viewLayout, viewQuestion, noQuestions } from './view';
import { getQuestions } from './service';

export default (user) => {

    document.getElementById(`mainPart`).appendChild(viewLayout());
    getQuestions(user).then(function(questions) {
    let elements = [];
    console.log(questions.numChildren());
    if(questions.numChildren()===0){
        elements.push(noQuestions());
    }else{
        questions.forEach((question) => {
            let element = viewQuestion(question);
            elements.push(element);
        })
    }
        elements.forEach(function(e) {
            document.getElementById(`myQuestionDiv`).appendChild(e);
        });
    });

}