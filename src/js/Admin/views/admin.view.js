import { revokeFlaggedQuestion,changeOfRole,getAllCategories,deleteCategoryById } from '../services/admin.service';
import $ from 'jquery';
export function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}

export function layout(){
    document.getElementById('usersDiv').innerHTML="";
    document.getElementById('BoardsContainer').innerHTML="";
    const table = createHTMLElement(`
    <table id="example" class="display" style="width:100%">
    <thead>
        <tr>
            <th>Question</th>
            <th>FlagCount</th>
            <th>Revoke</th>
        </tr>
    </thead>
    <tbody id="tableBody">
    </tbody>
</table>`);
document.getElementById("flagged_questions").appendChild(table);
}

export function createFlaggedDiv(question) {
    const flaggedDiv = createHTMLElement(
            `<tr>
                <td>${question.text}</td>
                <td>${question.flag_count}</td>
                <td>
                <button type="button" class="btn btn-warning" id ="${question.id}">Revoke Flag</button>
                </td>
            </tr>
            `)
    document.getElementById("tableBody").appendChild(flaggedDiv);
    document.getElementById(`${question.id}`).onclick = () => {
        revokeFlaggedQuestion(`${question.id}`);
    }

}
// Asish
export function layoutUserTable(){
    document.getElementById('flagged_questions').innerHTML="";
    document.getElementById('BoardsContainer').innerHTML="";
    const table = createHTMLElement(`<table id="example" class="display" style="width:100%">
    <thead>
        <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Change Role</th>
        </tr>
    </thead>
    <tbody id="tableBodyUser">
    </tbody>
</table>`);
document.getElementById("usersDiv").appendChild(table);
}
export function userDiv(user) {

    const userTable = createHTMLElement(
        `<tr>
            <td>${user.name}</td>
            <td>${user.role}</td>
            <td>
            <form>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="${user.id}">
                    <label class="form-check-label" for="exampleCheck1">Check me Out!!!</label>
                </div>
            </form>
            </td>
        </tr>
        `
    )
    document.getElementById("tableBodyUser").appendChild(userTable);
    document.getElementById(`${user.id}`).onclick = () => {
        changeOfRole(`${user.id}`);
    }
}

//Tejeswar

export function renderCategoryView(allCategoryObj){
    document.getElementById('usersDiv').innerHTML="";
    document.getElementById('flagged_questions').innerHTML="";
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

    }, true);
    addTopicButton.appendChild(addTopic);
    singleCatDiv.appendChild(addTopicButton);

    catContainerSection.appendChild(singleCatDiv);

}
document.getElementById("BoardsContainer").appendChild(catContainerSection);

}
