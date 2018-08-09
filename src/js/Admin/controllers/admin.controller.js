import { isCategoryAlreadyExist, getAllCatFromFirebase, insertCategoryToFirebase, getFlaggedQuestionService, getAllUserService, Category, createCategory, getAllCategories, getAllCategoriesWithTopics, getFlaggedAnswerService } from '../services/admin.service';
import { layout, layoutUserTable, renderCategoryView, layoutAnswer } from '../views/admin.view';
import $ from 'jquery';

const flagged = document.getElementById('flagged');
flagged.addEventListener('click', (event) => {
  event.preventDefault();
  layout();
  getFlaggedQuestionService();
  layoutAnswer();
  getFlaggedAnswerService();
});
layout();
getFlaggedQuestionService();
layoutAnswer();
getFlaggedAnswerService();



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
  console.log("category : " + catName + " going to be added ");
  $('#listClose').click();
  isCategoryAlreadyExist(catName).then(function (isCategoryExist) {
    if (isCategoryExist) {
      alert("Category with name " + catName + "already exist.Please try with a different name.");
      console.log("just returning the control");
      //return;
    }
    else {
      let singleCatObj = new Category(catName);
      insertCategoryToFirebase(singleCatObj).then(data1 => {
        getAllCatFromFirebase().then(data => {
          console.log(data);
          renderCategoryView(data);
        })

      });
    }

  })//end of then callback function
  //$('#listClose').click();
})

document.getElementById('retrieveCategories').onclick = () => {
  /*
  getAllCatFromFirebase().then((data => {
    console.log(data);
    renderCategoryView(data);
  }));
  */

 render().then( allCategoriesObjs=>{
  let wholeCategoryDom = renderCategoryViewwithTick(allCategoriesObjs);
 document.getElementById("BoardsContainer").innerHTML = wholeCategoryDom;
});
}


export function render() {
  return new Promise(function (resolve, reject) {
    getAllCatFromFirebase().then((allCategoryObj => {
      console.log(allCategoryObj);
      let singleDom = renderCategoryViewwithTick(allCategoryObj);

      resolve(allCategoryObj);


    }))
  })
}



$(document).on('click', '.helloid', function(event){
  console.log("delete button got clicked");
  console.dir(this);
  let parentCatId =this.parentElement.parentElement.id;
 // console.dir();
  firebase.database().ref('/categories/' + parentCatId).once('value').then(function(snapshot) {
      console.dir(snapshot.val());
      return new Promise((resolve, reject) => {
          let name = snapshot.val().name;
          console.log("to be deleted category:"+name);
          resolve(name);
      });
    }).then(name => {
      let isDeleteConfirmed = confirm("Are you sure to delete the category :"+name);
      console.log("isDeleteConfirmed:"+isDeleteConfirmed);
      if(isDeleteConfirmed){
         
         
         
          console.log("Delete categoty :"+parentCatId);
          delteCategoryFromFirebaseById(parentCatId).then(data1 =>{ 
              getAllCatFromFirebase().then((data => {
                  console.log(data);
                  renderCategoryView(data);
              }));
     });
      }
    })
  console.dir(event);
 });
