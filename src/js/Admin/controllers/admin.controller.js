import { getAllCatFromFirebase, getFlaggedQuestionService, getAllUserService, getFlaggedAnswerService } from '../services/admin.service';
import { layout, renderCategoryView, layoutAnswer, createFlaggedDiv, createFlaggedAnswerDiv } from '../views/admin.view';
import { getAllCatFromFirebase, getFlaggedQuestionService, getAllUserService, getFlaggedAnswerService } from '../services/admin.service';
import { layout, layoutUserTable, renderCategoryView, layoutAnswer, createFlaggedDiv, createFlaggedAnswerDiv } from '../views/admin.view';
import $ from 'jquery';

const flagged = document.getElementById('flagged');
flagged.addEventListener('click', (event) => {
  event.preventDefault();
  let display = layout();
  document.getElementById("flagged_questions").appendChild(display);
  getFlaggedQuestionService().then(function (questions) {
    questions.forEach((question) => {
      console.log("hello " + question);
      console.log(question.child(`is_flagged`).val());
      if (question.child(`is_flagged`).val() === 'True') {
        console.log(question.child('text').val());
        let html = createFlaggedDiv(question);
        document.getElementById("tableBody").appendChild(html);
      }
    });
  });
  let tableAnswer = layoutAnswer();
  document.getElementById("flagged_answers").appendChild(tableAnswer);
  getFlaggedAnswerService().then(function (questions) {
    questions.forEach((question) => {
      question.child('answers').forEach((answer) => {
        if (answer.child('is_flagged').val() === 'True') {
          let flaggedAnswerDiv = createFlaggedAnswerDiv(answer);
          document.getElementById("tableBodyAnswers").appendChild(flaggedAnswerDiv);
        }
      })
    })
  });
});
// layout(); OnLoad
let display = layout();
document.getElementById("flagged_questions").appendChild(display);
getFlaggedQuestionService().then(function (questions) {
  questions.forEach((question) => {
    console.log("hello " + question);
    console.log(question.child(`is_flagged`).val());
    if (question.child(`is_flagged`).val() === 'True') {
      console.log(question.child('text').val());
      let html = createFlaggedDiv(question);
      document.getElementById("tableBody").appendChild(html);
    }
  });
});
let tableAnswer = layoutAnswer();
document.getElementById("flagged_answers").appendChild(tableAnswer);
getFlaggedAnswerService().then(function (questions) {
  questions.forEach((question) => {
    question.child('answers').forEach((answer) => {
      if (answer.child('is_flagged').val() === 'True') {
        let flaggedAnswerDiv = createFlaggedAnswerDiv(answer);
        document.getElementById("tableBodyAnswers").appendChild(flaggedAnswerDiv);
      }
    })
  })
});

//Asish
const retrieveUser = document.getElementById("retrieveUser");
retrieveUser.addEventListener('click', (event) => {
  event.preventDefault();
  console.log("hello");
  getAllUserService().then(function (data) {
    let elements = [];
    data.forEach(element => {
      elements.push(userDiv(element));
      const retrieveUser = document.getElementById("retrieveUser");
      retrieveUser.addEventListener('click', (event) => {
        event.preventDefault();
        layoutUserTable();
        getAllUserService();
      });

  // Tejeswar

      render().then(allCategoriesObjs => {
        let wholeCategoryDom = renderCategoryViewwithTick(allCategoriesObjs);
        document.getElementById("BoardsContainer").innerHTML = wholeCategoryDom;
      });
      export function render() {
        return new Promise(function (resolve) {
          getAllCatFromFirebase().then((allCategoryObj => {
            console.log(allCategoryObj);
            resolve(allCategoryObj);
          }))
        })
      }

      $(document).on('click', '.helloid', function (event) {
        console.log("delete button got clicked");
        console.dir(this);
        let parentCatId = this.parentElement.parentElement.id;
        firebase.database().ref('/categories/' + parentCatId).once('value').then(function (snapshot) {
          console.dir(snapshot.val());
          return new Promise((resolve) => {
            let name = snapshot.val().name;
            console.log("to be deleted category:" + name);
            resolve(name);
          });
        }).then(name => {
          let isDeleteConfirmed = confirm("Are you sure to delete the category :" + name);
          console.log("isDeleteConfirmed:" + isDeleteConfirmed);
          if (isDeleteConfirmed) {
            console.log("Delete categoty :" + parentCatId);
            delteCategoryFromFirebaseById(parentCatId).then(() => {
              getAllCatFromFirebase().then((data => {
                console.log(data);
                renderCategoryView(data);
              }));
            });
          }
        })
        console.dir(event);
      });
