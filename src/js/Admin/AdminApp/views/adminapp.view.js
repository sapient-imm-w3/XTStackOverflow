import $ from '../../../../../node_modules/jquery/dist/jquery'
import {addTopic} from "../controller/adminapp.controller"
import {getAllCategories,deleteCategoryById,Topic,renderWholeCategoryView,deleteTopicById } from "../services/adminapp.service"


export function renderCategoryView(allCategoryObj){
    document.getElementById("BoardsContainer").innerHTML = "";
    if(allCategoryObj.length == 0){
        let addCatSectionDiv = document.createElement('div');
        addCatSectionDiv.setAttribute('class', 'addListButton');
        let addCatButton = document.createElement('button');
        addCatButton.setAttribute('id','saveList');
        addCatButton.setAttribute('class','btn btn-primary');
        addCatButton.setAttribute('data-toggle','modal');
        addCatButton.setAttribute('data-target','#listModal');
        addCatButton.setAttribute('data-placement','top');
        addCatButton.innerText = '+Add Category';
        addCatSectionDiv.appendChild(addCatButton);
        document.getElementById("BoardsContainer").appendChild(document.createElement('br'));
        document.getElementById("BoardsContainer").appendChild(addCatSectionDiv);
        document.getElementById("BoardsContainer").appendChild(document.createElement('br'));
        console.log("As Category is empty just returning");
        return;
    }
    let singleCatObj = allCategoryObj[0];
    console.log(singleCatObj.name);
    console.log(allCategoryObj.length);
  
let addCatSectionDiv = document.createElement('div');
addCatSectionDiv.setAttribute('class', 'addListButton');
let addCatButton = document.createElement('button');
addCatButton.setAttribute('id','saveList');
addCatButton.setAttribute('class','btn btn-primary');
addCatButton.setAttribute('data-toggle','modal');
addCatButton.setAttribute('data-target','#listModal');
addCatButton.setAttribute('data-placement','top');
addCatButton.innerText = '+Add Category';
addCatSectionDiv.appendChild(addCatButton);
document.getElementById("BoardsContainer").appendChild(document.createElement('br'));
document.getElementById("BoardsContainer").appendChild(addCatSectionDiv);
document.getElementById("BoardsContainer").appendChild(document.createElement('br'));
/*
let allCatObjsWithTopics ;
getAllCategoriesWithTopics.then(data => {
    console.log(data);
    allCatObjsWithTopics = data;
});
*/
let catContainerSection = document.createElement('div');
catContainerSection.setAttribute('id','catContainer');
document.getElementById("BoardsContainer").appendChild(catContainerSection);
for(let categoryCount = 0;categoryCount<allCategoryObj.length;categoryCount++){
    let singleCatObj = allCategoryObj[categoryCount];
    let singleCatDiv = document.createElement('div');
    singleCatDiv.setAttribute('id',singleCatObj.id);
    singleCatDiv.setAttribute('class','task-list');
    catContainerSection.appendChild(singleCatDiv);
    let taskHeaderDiv = document.createElement('div');
    taskHeaderDiv.setAttribute('class','task-header');
    let singleSpan = document.createElement('span');
    singleSpan.innerText=singleCatObj.name;
    taskHeaderDiv.appendChild(singleSpan);
    singleCatDiv.appendChild(taskHeaderDiv);
/*
    let arrOfTopicsOfACategory = singleCatObj.topics;
    for(let cardCount = 0;cardCount<arrOfTopicsOfACategory.length;cardCount++){
        let singleCardObj = arrOfTopicsOfACategory[cardCount];
        createSingleCardDOM(singleCardObj);
    }
*/

/*
    let addTopicButton = document.createElement('div');
    addTopicButton.setAttribute('class','addCardButton');
    let addTopic = document.createElement('button');
    addTopic.setAttribute('id','save');
    addTopic.setAttribute('class','btn btn-primary open-modal');
    addTopic.setAttribute('data-toggle','modal');
    addTopic.setAttribute('data-target','#cardModal');
    addTopic.setAttribute('data-placement','top');
    addTopic.innerText = 'Add Topic';
    addTopic.addEventListener('click', function(event) {
    
     let parentCatId = $(this).parent().parent().attr('id');
     console.log("Add Topic button got clicked of category :"+parentCatId);
     $('#parentCategoryId').val(singleCatObj.id);
    }, true);
    addTopicButton.appendChild(addTopic);
    singleCatDiv.appendChild(addTopicButton);

    catContainerSection.appendChild(singleCatDiv);
*/
let addTopicButton = document.createElement('div');
    addTopicButton.setAttribute('class','addCardButton');
    let addTopic = document.createElement('button');
    addTopic.setAttribute('id','save');
    addTopic.setAttribute('class','btn btn-primary');
    
    addTopic.innerText = 'Delete';
    addTopic.addEventListener('click', function(event) {
    
     let parentCatId = $(this).parent().parent().attr('id');
     console.log("Delete categoty :"+parentCatId);
     deleteCategoryById(parentCatId).then(data1 =>{ 
        getAllCategories().then(data => {
        console.log(data);
        renderCategoryView(data);
    })
});;
     //$('#parentCategoryId').val(singleCatObj.id);
    }, true);
    addTopicButton.appendChild(addTopic);
    singleCatDiv.appendChild(addTopicButton);

    catContainerSection.appendChild(singleCatDiv);

}
document.getElementById("BoardsContainer").appendChild(catContainerSection);

}

function createSingleCardDOM(_singelCarObj) {
    let cardId = _singelCarObj.id;
    let parentListId = _singelCarObj.categoryId;
    let parentListDiv = document.getElementById(parentListId);

let cardIdDiv = document.createElement("div");
cardIdDiv.setAttribute("id",_singelCarObj.id);
//console.log("#"+_singelCarObj.cardId);
//$("#"+_singelCarObj.cardId).draggable();
cardIdDiv.setAttribute("class","todo-task");
cardIdDiv.setAttribute("style","background:green");

let cardTitleDiv = document.createElement("div");
cardTitleDiv.setAttribute("class","task-header");
cardTitleDiv.innerText = _singelCarObj.name;
cardIdDiv.appendChild(cardTitleDiv);

//let cardDescDiv = document.createElement("div");
//cardDescDiv.setAttribute("class","task-description");
//cardDescDiv.innerText = _singelCarObj.cardDesc;
//cardIdDiv.appendChild(cardDescDiv);
/*
let cardEditButton = document.createElement("button");
cardEditButton.setAttribute("class","editCard");
cardEditButton.innerText = "Edit";
cardIdDiv.appendChild(cardEditButton);
cardEditButton.addEventListener("click",function(){
    let _that = this;
    populateModal(_that);

});
*/
let cardDeleteButton = document.createElement("button");
cardDeleteButton.setAttribute("class","deleteCard");
cardDeleteButton.innerText = "delete";
cardDeleteButton.addEventListener("click",function(event){
    let categoryId = $(this).parent().parent().attr('id');
    let topicId = $(this).parent().attr('id');
    console.log(topicId+" going to be delted from the category:"+categoryId);
    deleteTopicById(topicId).then(data => {
        console.log(data);
        renderWholeCategoryView();
    })
    /*
    removeCard(cardId);
    let boardId = cardId.split("_")[0];
let _thisObj = {};
_thisObj.id = boardId;
_thisObj.innerText = getSpecificBoardById(boardId).boardTitle;
createSpecificBoardSection(_thisObj, "");
*/
});

cardIdDiv.appendChild(cardDeleteButton);


parentListDiv.appendChild(cardIdDiv);
console.log("createSingleCardDOM::  "+parentListDiv);

}
/*
export function renderCategoryView(allCategoryObj){
    document.getElementById("BoardsContainer").innerHTML = "";
    let singleCatObj = allCategoryObj[0];
    console.log(singleCatObj.name);
    console.log(allCategoryObj.length);
   
    let addCatSec = `<div class="addListButton">
    <button id="saveList" type="button" class="btn btn-primary" data-toggle="modal" data-target="#listModal" data-placement="top">+Add Category</button>
</div>
<br>`;

let catContainerSection = `<div id="catContainer">`;

let catContainerSectionEnding = `</div>`;
let singleCategoryBody = "";
for(let categoryCount = 0;categoryCount<allCategoryObj.length;categoryCount++){
    let singleCatObj = allCategoryObj[categoryCount];
     singleCategoryBody = `<div id=${singleCatObj.id} class="task-list">
    <div class="task-header">
        <span>${singleCatObj.name}</span>
    </div>`;


    let addTopicButton = `<div class="addCardButton">
        <button id="save" type="button" class="btn btn-primary open-modal" data-toggle="modal" data-target="#cardModal" data-placement="top">Add Topic</button>
    </div>
    </div>`;//this div is ending of each single category item
    singleCategoryBody = singleCategoryBody+addTopicButton;
    catContainerSection = catContainerSection+ singleCategoryBody;
}
let singleVal = addCatSec+catContainerSection+catContainerSectionEnding;
//console.log(singleVal);
document.getElementById("BoardsContainer").innerHTML = singleVal;
}

*/

 
 