import { getRecommended, getRec } from './service';
import { viewLayout, getRecQuestion, getTitle, noRecQuestions } from './view';

export default (user) => {
  document.getElementById(`content`).appendChild(viewLayout());
  getRecommended(user).then(function (questions) {
    getRec(user).then(function (data) {
      data.forEach((category) => {
        let elements = [];
        document.getElementById('recommended').appendChild(getTitle(category.val()));
        let count = 0;
        questions.forEach((question) => {
          if (count < 5) {
            question.child(`categories`).val().forEach((cat) => {
              if (cat.name === category.val()) {
                let display = getRecQuestion(question.child(`text`).val(), question.key + "Trending");
                elements.push(display);
                count++;
              }
            })
          }
        })
        if (count === 0) {
          elements.push(noRecQuestions(category.val()));
        }
        elements.forEach(function (e) {
          document.getElementById(`recommended`).appendChild(e);
        });
      })
    })
  })
}
