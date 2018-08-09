import { getAllCatFromFirebase,insertCategoryToFirebase,getFlaggedQuestionService,getAllUserService,Category,createCategory,getAllCategories,getAllCategoriesWithTopics, getFlaggedAnswerService } from '../services/admin.service';
import {layout,renderCategoryView, layoutAnswer,createFlaggedDiv,createFlaggedAnswerDiv, layoutUser} from '../views/admin.view';
import $ from 'jquery';

const flagged = document.getElementById('flagged');
flagged.addEventListener('click', (event) => {
  event.preventDefault();
  let display = layout();
  document.getElementById("flagged_questions").appendChild(display);
  getFlaggedQuestionService().then(function(questions) {
    questions.forEach((question) => {
      console.log("hello "+ question);
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
  getFlaggedAnswerService().then(function(questions) {
    questions.forEach((question) => {
      question.child('answers').forEach((answer) => {
        if(answer.child('is_flagged').val()==='True'){
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
getFlaggedQuestionService().then(function(questions) {
  questions.forEach((question) => {
    console.log("hello "+ question);
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
getFlaggedAnswerService().then(function(questions) {
  questions.forEach((question) => {
    question.child('answers').forEach((answer) => {
      if(answer.child('is_flagged').val()==='True'){
        let flaggedAnswerDiv = createFlaggedAnswerDiv(answer);
              document.getElementById("tableBodyAnswers").appendChild(flaggedAnswerDiv);
      }
    })
})
});



//Asish
const retrieveUser = document.getElementById("retrieveUser");
retrieveUser.addEventListener('click', (event) => {
event.preventDefault();
console.log("hello");
getAllUserService().then(function(data){
let elements = [];
data.forEach(element => {
elements.push(userDiv(element));
});
console.log(elements);
document.getElementById("tableBody").innerHTML ="";
elements.forEach(element=>{
document.getElementById(`tableBody`).appendChild(element);
})
});
});

let layoutDom = layoutUser();
document.getElementById("userList").appendChild(layoutDom); 
// Tejeswar

$('#listModal').on('click', '#listSave', function (event) {

  let catName = $('#formGroupListTitleInput').val();
  console.log("category : "+catName+" going to be added ");
  let singleCatObj = new Category(catName);
  insertCategoryToFirebase(singleCatObj).then(data1 =>{ 
    getAllCatFromFirebase().then(data => {
    console.log(data);
    renderCategoryView(data);
})

});
 
 $('#listClose').click();
})

document.getElementById('retrieveCategories').onclick = () =>{
  getAllCatFromFirebase().then((data => {
    console.log(data);
    renderCategoryView(data);
}));


}

