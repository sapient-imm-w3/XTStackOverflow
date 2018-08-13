
import { getAllCatFromFirebase, getFlaggedQuestionService, getAllUserService, getFlaggedAnswerService,delteCategoryFromFirebaseById,isCategoryAlreadyExist,Category,insertCategoryToFirebase   } from '../services/admin.service';
import { layout, layoutUser, layoutAnswer, createFlaggedDiv, createFlaggedAnswerDiv, renderCategoryViewwithTick, userDiv } from '../views/admin.view';
import $ from 'jquery';

export function bootstrapadmin () {

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

      console.log(elements);
      document.getElementById("tableBody").innerHTML ="";
      elements.forEach(element=>{
      document.getElementById(`tableBody`).appendChild(element);
})
  });
});
});

let layoutDom = layout();
document.getElementById("userList").appendChild(layoutDom);


// Tejeswar

const retrieveCategories = document.getElementById('retrieveCategories');
retrieveCategories.addEventListener('click',(event)=>{
  event.preventDefault();
  render().then(allCategoriesObjs => {
    let wholeCategoryDom = renderCategoryViewwithTick(allCategoriesObjs);
    document.getElementById("BoardsContainer").innerHTML = wholeCategoryDom;
  });
})

function render() {
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
          render().then(allCategoriesObjs => {
            let wholeCategoryDom = renderCategoryViewwithTick(allCategoriesObjs);
            document.getElementById("BoardsContainer").innerHTML = wholeCategoryDom;
          });
        }));
      });
    }
  })
  console.dir(event);
});

$('#listModal').on('click', '#listSave', function (event) {

  let catName = $('#formGroupListTitleInput').val();
  console.log("category : "+catName+" going to be added ");
  $('#listClose').click();
  isCategoryAlreadyExist(catName).then(function(isCategoryExist){
if(isCategoryExist){
    alert("Category with name "+ catName + " already exist.Please try with a different name.");
  console.log("just returning the control");
  //return;
}
else{
  let singleCatObj = new Category(catName);
  insertCategoryToFirebase(singleCatObj).then(data1 =>{
      getAllCatFromFirebase().then(data => {
      console.log(data);
     //renderCategoryViewwithTick(data);
      render().then( data=>{
          let wholeCatDom = renderCategoryViewwithTick(data);
          document.getElementById("BoardsContainer").innerHTML = wholeCatDom;
      });
  })

});
}

  })//end of then callback function
 //$('#listClose').click();

});//end of onlick event
}