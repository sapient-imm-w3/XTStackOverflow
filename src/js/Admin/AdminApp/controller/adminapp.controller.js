import $ from '../../../../../node_modules/jquery/dist/jquery'
import {isCategoryAlreadyExist,getAllCatFromFirebase,insertCategoryToFirebase,renderWholeCategoryView,createTopic,Topic,Category,createCategory,getAllCategories} from '../services/adminapp.service'
import {renderCategoryView} from '../views/adminapp.view'


////////////      CATEGORY RELATED    /////////////////////////
$('#listModal').on('click', '#listSave', function (event) {

    let catName = $('#formGroupListTitleInput').val();
    console.log("category : "+catName+" going to be added ");
    $('#listClose').click();
    isCategoryAlreadyExist(catName).then(function(isCategoryExist){
  if(isCategoryExist){
      alert("Category with name "+ catName + "already exist.Please try with a different name.");
    console.log("just returning the control");
    //return;
  }
  else{
    let singleCatObj = new Category(catName);
    insertCategoryToFirebase(singleCatObj).then(data1 =>{ 
        getAllCatFromFirebase().then(data => {
        console.log(data);
        renderCategoryView(data);
    })
    
});
  }
  
    })//end of then callback function
   //$('#listClose').click();
 
  });//end of onlick event
//////////////////   TOPIC RELATED      ////////////////////////
export let addTopic = function(event){
    console.log("Add Topic button got clicked");
};
  $('#cardModal').on('click', '#cardSave', function (event) {
    let parentCatId = $('#parentCategoryId').val();
    let topicName = $('#formGroupCardTitleInput').val();
    console.log("Topic "+topicName+" going to be added in the category :"+parentCatId);
    let singleTopicObj = new Topic(topicName,parentCatId);
    createTopic(singleTopicObj).then(data => {
        console.log(data);
        renderWholeCategoryView();
    })
    $('#cardClose').click();

  
  });
  
  //$('.addCardButton').on('click', '.open-modal', addTopic(event));