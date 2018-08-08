import {getRecommended} from './service';
import {viewLayout} from './view';

export default (user) => {
document.getElementById(`content`).appendChild(viewLayout());
getRecommended(user).then(function(data) {
    let elements = [];
   
    data.forEach((category) => {
        let title = getTitle(category.val());
        document.getElementById('recommended').appendChild(title);
        let count = 0;
        questions.forEach((question) => {
          if (count < 5) {
            question.child(`categories`).val().forEach((cat) => {
              if (cat.name === category.val()) {
                let display = getRecQuestion(question.child(`text`).val(),question.key+"Trending");
                document.getElementById('recommended').appendChild(display);
                document.getElementById(`${question.key}`+"Trending").onclick = (event) => {
                  event.preventDefault();
                 
              }
                count++;
              }
            })
          }
        })
        if(count===0){
          noRecQuestions(category.val());
        }
      })
    
        elements.forEach(function(e) {
            document.getElementById(`myQuestionDiv`).appendChild(e);
        });
    });
}