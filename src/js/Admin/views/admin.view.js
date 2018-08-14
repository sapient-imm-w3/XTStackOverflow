import firebase from 'firebase/app'
import 'firebase/auth';
 
import { revokeFlaggedQuestion, revokeFlaggedAnswer, changeOfRole } from '../services/admin.service';


export function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}

export function createLayout(){
    return createHTMLElement(`<main id="wrapper">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #ED7B84;">
        <a class="navbar-brand" href="#">StackOverflow</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" id="flagged" href="#">Flagged
                        <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="retrieveUser" href="#">Users</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="retrieveCategories" href="#">Categories</a>
                </li>
            </ul>
            <span class="navbar-text">
                You are an Admin!!!
            </span>
        </div>
    </nav>
    <div id="flagged_questions">
    
    </div>
    <div id="flagged_answers">
    
    </div>
    <div id="usersDiv">
        
    </div>
    <section id="BoardsContainer">
    
    </section>
    <!-- Modal For Category -->
    <div class="modal" id="listModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" style="color: black">Category Detail</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
    
                        <input type="text" class="form-control" id="formGroupListTitleInput" placeholder="Add Category Name">
    
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="listClose" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button id="listSave" type="button" class="btn btn-primary">Add Category</button>
                </div>
            </div>
        </div>
    </div>
    </main>`);
}

export function layout() {
    document.getElementById('usersDiv').innerHTML = "";
    document.getElementById('BoardsContainer').innerHTML = "";
    document.getElementById('flagged_answers').innerHTML = "";
    document.getElementById(`flagged_questions`).innerHTML = "";
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

export function createFlaggedAnswerDiv(answer,qsnId) {
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
        revokeFlaggedAnswer(answer.key,qsnId);
    });
    return flaggedDivAnswer;
}

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
    return  table;
}

export  function  userDiv(user) {
    let  data  = user;
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
    </div>`;
        singleCategoryBody = singleCategoryBody + addTopicButton;
        catContainerSection = catContainerSection + singleCategoryBody;

    }
    let wholeCategoryView = addCatSec + catContainerSection + catContainerSectionEnding;
    return wholeCategoryView;
}
export function viewLayout(){
    let main = `<div class="col-md-3">
    
      <button type="button" id="signout" class="btn btn-danger">Sign Out</button>
    
    </div>`;

    let mainElement = createHTMLElement(main);
    mainElement.firstElementChild.addEventListener('click', () => {
      firebase.auth().signOut()
      .then(()=>{
        close();
        close_window();
      });
    })

    return mainElement;
        
    }

    function close_window() {
      if (confirm("Close Window?")) {
        document.body.innerHTML = "";
        let html = `<div style="font-size: 50px; margin-top: 20%; margin-left: 35%; color: green">Successfully Logged Out..!!!</div>`;
        document.body.appendChild(createHTMLElement(html));

      }
    }