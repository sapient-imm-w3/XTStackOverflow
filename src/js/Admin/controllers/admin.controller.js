import { getAllCatFromFirebase,insertCategoryToFirebase,getFlaggedQuestionService,getAllUserService,Category,createCategory,getAllCategories,getAllCategoriesWithTopics, getFlaggedAnswerService } from '../services/admin.service';
import {layout,layoutUserTable,renderCategoryView, layoutAnswer,createFlaggedDiv,createFlaggedAnswerDiv} from '../views/admin.view';
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
      // database.ref(`questions/` + question.key + `/answers`).orderByChild("is_flagged").equalTo("True")
      //     .once('value', (answers) => {
      //         answers.forEach((answer) => {
      //           let flaggedAnswerDiv = createFlaggedAnswerDiv(answer);
      //           document.getElementById("tableBodyAnswers").appendChild(flaggedAnswerDiv);
      //         })
      //     });
  })
  });
});
// layout();
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

    // database.ref(`questions/` + question.key + `/answers`).orderByChild("is_flagged").equalTo("True")
    //     .once('value', (answers) => {
    //         answers.forEach((answer) => {
    //           let flaggedAnswerDiv = createFlaggedAnswerDiv(answer);
    //           document.getElementById("tableBodyAnswers").appendChild(flaggedAnswerDiv);
    //         })
    //     });
})
});



//Asish
const retrieveUser = document.getElementById("retrieveUser");
retrieveUser.addEventListener('click', (event) => {
    event.preventDefault();
    layoutUserTable();
    getAllUserService();
  });
// Tejeswar
/*
  $('#listModal').on('click', '#listSave', function (event) {

    let catName = $('#formGroupListTitleInput').val();
    console.log("category : "+catName+" going to be added ");
    let singleCatObj = new Category(catName);
    createCategory(singleCatObj).then(data1 =>{ 
        getAllCategories().then(data => {
        console.log(data);
        renderCategoryView(data);
    })
});
   
   $('#listClose').click();
  })
  */
/*
  document.getElementById('retrieveCategories').onclick = () =>{
    getAllCategoriesWithTopics().then(data => {
      console.log(data);
      renderCategoryView(data);
  });
  

  }
*/
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

