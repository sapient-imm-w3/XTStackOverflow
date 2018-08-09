import { getTitle, getRecQuestion, noRecQuestions } from './view';
import { database } from "../controller";

export function getRecommended(user) {

  const dbq = database.ref(`questions`);
  const db = database.ref(`users/` + user.uid + `/fav_categories`);
  dbq.on('value', (questions) => {
    db.on('value', (data) => {
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
    })
  });
}