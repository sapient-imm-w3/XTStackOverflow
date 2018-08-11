import {viewLayout,displaytrending} from './views';
import { getAnswerCountFromDB, getCatQuestions } from './service';

export default () => {
    let content = viewLayout();
     getAnswerCountFromDB().then((questions) => {
        let elements = [];
        questions.forEach((question) => {
            console.log(question.child(`answer_count`).val());
            let html = displaytrending(question.child(`answer_count`).val(),question.child(`text`).val(),question.child(`date`).val(),question.child(`categories`).val(),question.key);
            elements.push(html);
        });
        //return elements;
        elements.forEach(function(e) {
            content.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.appendChild(e);
            });
      });
      return content;
    }

export function displayCatQuestions(name){
    document.getElementById(`trendingDiv`).innerHTML = "";
    getCatQuestions(name).then((questions) => {
        let elements = [];
        let count = 0;
          questions.forEach((question) => {
            if (count < 5) {
              question.child(`categories`).val().forEach((cat) => {
                if (cat.name === name) {
                    let html = displaytrending(question.child(`answer_count`).val(),question.child(`text`).val(),question.child(`date`).val(),question.child(`categories`).val(),question.key);
                    elements.push(html);
                  count++;
                }
              })
            }
          });
          elements.forEach(function(e) {
            document.getElementById(`trendingDiv`).appendChild(e);
            });
        });
    document.getElementById(`trendingHeading`).innerHTML = `${name}`;
    
}