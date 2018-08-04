import $ from '../../../../../node_modules/jquery/dist/jquery'
import {renderWholeCategoryView,createTopic,Topic,Category,createCategory,getAllCategories} from '../services/adminapp.service'
import {renderCategoryView} from '../views/adminapp.view'


////////////      CATEGORY RELATED    /////////////////////////
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