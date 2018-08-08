import { getAllCatFromFirebase,insertCategoryToFirebase,getFlaggedQuestionService,getAllUserService,Category,createCategory,getAllCategories,getAllCategoriesWithTopics, getFlaggedAnswerService } from '../services/admin.service';
import {layout,layoutUserTable,renderCategoryView, layoutAnswer} from '../views/admin.view';
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

