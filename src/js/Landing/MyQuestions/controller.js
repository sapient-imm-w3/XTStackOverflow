import { viewLayout, viewQuestion, noQuestions } from './view';
import { getQuestions } from './service';

export default (user) => {

    let myQuestionSection = viewLayout()
    getQuestions(user).then(function(questions) {
    let elements = [];
    if(questions.numChildren()===0){
        elements.push(noQuestions());
    }else{
        questions.forEach((question) => {
            let element = viewQuestion(question);
            if(question.child(`is_flagged`).val()===false) elements.push(element);
        })
    }
        elements.forEach(function(e) {
            myQuestionSection.lastElementChild.appendChild(e);
        });
    });
    return myQuestionSection;
}