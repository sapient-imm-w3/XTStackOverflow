import { getTitle, getRecQuestion } from './view';
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
        return questions.forEach((question) => {
          if (count < 5) {
            question.child(`categories`).val().forEach((cat) => {
              if (cat.name === category.val()) {
                let display = getRecQuestion(question.child(`text`).val());
                document.getElementById('recommended').appendChild(display);
                count++;
              }
            })
          }
        })
      })
    })
  });
}