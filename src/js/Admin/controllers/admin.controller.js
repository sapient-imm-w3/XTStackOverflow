
import { getAllCatFromFirebase, getFlaggedQuestionService, getAllUserService, getFlaggedAnswerService,delteCategoryFromFirebaseById,isCategoryAlreadyExist,Category,insertCategoryToFirebase   } from '../services/admin.service';
import { layout, layoutUser, createLayout, layoutAnswer, createFlaggedDiv, createFlaggedAnswerDiv, renderCategoryViewwithTick, userDiv, createHTMLElement, viewLayout } from '../views/admin.view';
import $ from 'jquery';

export function bootstrapadmin () {
document.getElementById(`navbar`).innerHTML = "";
document.getElementById(`admin`).appendChild(createLayout());
const flagged = document.getElementById('flagged');
flagged.addEventListener('click', (event) => {
  event.preventDefault();
  let display = layout();
  document.getElementById("flagged_questions").appendChild(display);
  getFlaggedQuestionService().then(function (questions) {
    questions.forEach((question) => {
      if (question.child(`is_flagged`).val() === true) {
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
        if (answer.child('is_flagged').val() === true) {
          let flaggedAnswerDiv = createFlaggedAnswerDiv(answer,question.key);
          document.getElementById("tableBodyAnswers").appendChild(flaggedAnswerDiv);
        }
      })
    })
  });
});
document.getElementById(`admin`).appendChild(viewLayout());
let display = layout();
document.getElementById("flagged_questions").appendChild(display);
getFlaggedQuestionService().then(function (questions) {
  questions.forEach((question) => {
    if (question.child(`is_flagged`).val() === true) {
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
      if (answer.child('is_flagged').val() === true) {
        let flaggedAnswerDiv = createFlaggedAnswerDiv(answer,question.key);
        document.getElementById("tableBodyAnswers").appendChild(flaggedAnswerDiv);
      }
    })
  })
});


const retrieveUser = document.getElementById("retrieveUser");
retrieveUser.addEventListener('click', (event) => {
  event.preventDefault();
  displayUsers();
});

const retrieveCategories = document.getElementById('retrieveCategories');
retrieveCategories.addEventListener('click',(event)=>{
  document.getElementById('usersDiv').innerHTML = "";
  document.getElementById('BoardsContainer').innerHTML = "";
  document.getElementById('flagged_answers').innerHTML = "";
  document.getElementById(`flagged_questions`).innerHTML = "";
  event.preventDefault();
  render().then(allCategoriesObjs => {
    let wholeCategoryDom = renderCategoryViewwithTick(allCategoriesObjs);
    document.getElementById("BoardsContainer").innerHTML = wholeCategoryDom;
  });
})

function render() {
  return new Promise(function (resolve) {
    getAllCatFromFirebase().then((allCategoryObj => {
      resolve(allCategoryObj);
    }))
  })
}

$(document).on('click', '.helloid', function (event) {
  let parentCatId = this.parentElement.parentElement.id;
  firebase.database().ref('/categories/' + parentCatId).once('value').then(function (snapshot) {
    return new Promise((resolve) => {
      let name = snapshot.val().name;
      resolve(name);
    });
  }).then(name => {
    let isDeleteConfirmed = confirm("Are you sure to delete the category :" + name);
    if (isDeleteConfirmed) {
      delteCategoryFromFirebaseById(parentCatId).then(() => {
        getAllCatFromFirebase().then((data => {
          render().then(allCategoriesObjs => {
            let wholeCategoryDom = renderCategoryViewwithTick(allCategoriesObjs);
            document.getElementById("BoardsContainer").innerHTML = wholeCategoryDom;
          });
        }));
      });
    }
  })
});

$('#listModal').on('click', '#listSave', function (event) {

  let catName = $('#formGroupListTitleInput').val();
  $('#listClose').click();
  isCategoryAlreadyExist(catName).then(function(isCategoryExist){
if(isCategoryExist){
    alert("Category with name "+ catName + " already exist.Please try with a different name.");
}
else{
  let singleCatObj = new Category(catName);
  insertCategoryToFirebase(singleCatObj).then(data1 =>{
      getAllCatFromFirebase().then(data => {
      render().then( data=>{
          let wholeCatDom = renderCategoryViewwithTick(data);
          document.getElementById("BoardsContainer").innerHTML = wholeCatDom;
      });
  })

});
}

  })

});
}

export function displayUsers(){
  let display = layoutUser();
  document.getElementById("usersDiv").appendChild(display);
  getAllUserService().then(function (data) {
    let elements = [];
    data.forEach(element => {
      elements.push(userDiv(element));

      document.getElementById("tableBody").innerHTML ="";
      elements.forEach(element=>{
      document.getElementById(`tableBody`).appendChild(element);
})
  });
});
}