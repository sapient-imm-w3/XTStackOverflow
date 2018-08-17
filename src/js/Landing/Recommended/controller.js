import { getRecommended, getRec } from './service';
import { viewLayout, getRecQuestion, getTitle, noRecQuestions } from './view';

export default (user) => {
  let div = viewLayout();
  getRecommended(user).then(function (questions) {
    getRec(user).then(function (data) {
      data.forEach((category) => {
        let elements = [];
        div.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.appendChild(getTitle(category.child(`name`).val()));
        let count = 0;
        questions.forEach((question) => {
          if (count < 5) {
            question.child(`categories`).forEach((cat) => {
              if (cat.child(`name`).val() === category.child(`name`).val()) {
                let display = getRecQuestion(question.child(`text`).val(), question.key);
                elements.push(display);
                count++;
              }
            })
          }
        })
        if (count === 0) {
          elements.push(noRecQuestions(category.child(`name`).val()));
        }
        elements.forEach(function (e) {
          div.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.appendChild(e);
        });
      })
    })
  })
  return div;
}
