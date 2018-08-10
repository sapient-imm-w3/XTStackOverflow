import { revokeFlaggedQuestion, revokeFlaggedAnswer, changeOfRole } from '../services/admin.service';


export function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}

export function layout() {
    document.getElementById('usersDiv').innerHTML = "";
    document.getElementById('BoardsContainer').innerHTML = "";
    document.getElementById('flagged_answers').innerHTML = "";
    const table = createHTMLElement(`
    <table id="examplelayout" class="table table-striped table-hover table-bordered" style="width:100%">
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
    return table;
}

export function createFlaggedDiv(question) {
    const flaggedDiv = createHTMLElement(
        `<tr>
                <td>${question.child(`text`).val()}</td>
                <td>${question.child(`flag_count`).val()}</td>
                <td>
                <button type="button" class="btn purple-background" id ="${question.key}">Revoke Flag</button>
                </td>
            </tr>
            `)
    flaggedDiv.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.addEventListener('click', (event) => {
        revokeFlaggedQuestion(question.key);
    });
    return flaggedDiv;
}

export function layoutAnswer() {
    document.getElementById('usersDiv').innerHTML = "";
    document.getElementById('BoardsContainer').innerHTML = "";
    const tableAnswer = createHTMLElement(`
    
    <table id="examplelayoutAnswer" class="table table-striped table-hover table-bordered" style="width:100%">
    <thead>
        <tr>
            <th>Answers</th>
            <th>FlagCount</th>
            <th>Revoke</th>
        </tr>
    </thead>
    <tbody id="tableBodyAnswers">
    </tbody>
</table>`);
    return tableAnswer
}

export function createFlaggedAnswerDiv(answer) {
    const flaggedDivAnswer = createHTMLElement(
        `<tr>
                <td>${answer.child(`text`).val()}</td>
                <td>${answer.child(`flag_count`).val()}</td>
                <td>
                <button type="button" class="btn purple-background" id ="${answer.key}">Revoke AFlag</button>
                </td>
            </tr>
            `)
    flaggedDivAnswer.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.addEventListener('click', (event) => {
        revokeFlaggedAnswer(answer.key);
    });
    return flaggedDivAnswer;
}

// Asish
export  function  layoutUser() {
    const  table  =  createHTMLElement(`<table id="example" class="display" style="width:100%">
    <thead>
    <tr>
    <th>Name</th>
    <th>Role</th>
    <th>Change Role</th>
    </tr>
    </thead>
    <tbody id="tableBody">
    </tbody>
    </table>`);
    //document.getElementById("userList").appendChild(table);
    return  table;
}

export  function  userDiv(user) {
    //document.getElementById("tableBody").innerHTML ="";
    let  data  = user;
    console.log(data.val());
    const  userTable  =  createHTMLElement(
        `<tr>
    <td>${data.child('name').val()}</td>
    <td>${data.child('role').val()}</td>
    <td>
    <input type="checkbox"  id="${data.key}">
    </td>
    </tr>
    `);
    userTable.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.onclick  =  ()  =>  {
        changeOfRole(`${data.key}`);
    }
    return  userTable;
}
//Tejeswar

export function renderCategoryViewwithTick(allCategoryObj) {
    document.getElementById("BoardsContainer").innerHTML = "";
    let addCatSec = `<div class="addListButton">
    <button id="saveList" type="button" class="btn btn-primary" data-toggle="modal" data-target="#listModal" data-placement="top">+Add Category</button>
</div>
<br>`;

    let catContainerSection = `<div id="catContainer">`;
    let catContainerSectionEnding = `</div>`;

    let singleCategoryBody = "";
    let arrOfKeys = Object.keys(allCategoryObj);
    for (let categoryCount = 0; categoryCount < arrOfKeys.length; categoryCount++) {
        let catKey = arrOfKeys[categoryCount];
        let singleCatObj = allCategoryObj[catKey];
        singleCategoryBody = `<div id=${catKey} class="task-list">
    <div class="task-header">
        <span>${singleCatObj.name}</span>
    </div>`;

        let addTopicButton = `<div class="addCardButton">
        <button  type="button" class="helloid" data-toggle="modal" data-target="#cardModal" data-placement="top">Delete</button>
    </div>
    </div>`;//this div is ending of each single category item
        singleCategoryBody = singleCategoryBody + addTopicButton;
        catContainerSection = catContainerSection + singleCategoryBody;

    }
    let wholeCategoryView = addCatSec + catContainerSection + catContainerSectionEnding;
    return wholeCategoryView;
}
