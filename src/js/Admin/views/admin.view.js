import { getAllCatFromFirebase, delteCategoryFromFirebaseById, revokeFlaggedQuestion, revokeFlaggedAnswer, changeOfRole } from '../services/admin.service';
import $ from 'jquery';
import firebase from "firebase/app";

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
export function layoutUser(){
    const table = createHTMLElement(`<table id="example" class="display" style="width:100%">
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
    return table;
    }
    
    export function userDiv(user) {
    //document.getElementById("tableBody").innerHTML ="";
    let data =user;
    console.log(data.val());
    const userTable = createHTMLElement(
    `<tr>
    <td>${data.child('name').val()}</td>
    <td>${data.child('role').val()}</td>
    <td>
    <input type="checkbox"  id="${data.key}">
    </td>
    </tr>
    `);
    userTable.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.onclick = () => {
    changeOfRole(`${data.key}`); 
    }
    return userTable;
//Tejeswar

export function renderCategoryView(allCategoryObj) {

    document.getElementById('usersDiv').innerHTML = "";
    document.getElementById('flagged_questions').innerHTML = "";
    document.getElementById('flagged_answers').innerHTML = "";
    document.getElementById("BoardsContainer").innerHTML = "";
    //if(allCategoryObj.length == 0){
    if (allCategoryObj == null || allCategoryObj.length == 0) {
        let addCatSectionDiv = document.createElement('div');
        addCatSectionDiv.setAttribute('class', 'addListButton');
        let addCatButton = document.createElement('button');
        addCatButton.setAttribute('id', 'saveList');
        addCatButton.setAttribute('class', 'btn btn-primary');
        addCatButton.setAttribute('data-toggle', 'modal');
        addCatButton.setAttribute('data-target', '#listModal');
        addCatButton.setAttribute('data-placement', 'top');
        addCatButton.innerText = '+Add Category';
        addCatSectionDiv.appendChild(addCatButton);
        document.getElementById("BoardsContainer").appendChild(document.createElement('br'));
        document.getElementById("BoardsContainer").appendChild(addCatSectionDiv);
        document.getElementById("BoardsContainer").appendChild(document.createElement('br'));
        console.log("As Category is empty just returning");
        return;
    }
    /*
    let singleCatObj = allCategoryObj[0];
    console.log(singleCatObj.name);
    console.log(allCategoryObj.length);
  */
    let addCatSectionDiv = document.createElement('div');
    addCatSectionDiv.setAttribute('class', 'addListButton');
    let addCatButton = document.createElement('button');
    addCatButton.setAttribute('id', 'saveList');
    addCatButton.setAttribute('class', 'btn btn-primary');
    addCatButton.setAttribute('data-toggle', 'modal');
    addCatButton.setAttribute('data-target', '#listModal');
    addCatButton.setAttribute('data-placement', 'top');
    addCatButton.innerText = '+Add Category';
    addCatSectionDiv.appendChild(addCatButton);
    document.getElementById("BoardsContainer").appendChild(document.createElement('br'));
    document.getElementById("BoardsContainer").appendChild(addCatSectionDiv);
    document.getElementById("BoardsContainer").appendChild(document.createElement('br'));

    let catContainerSection = document.createElement('div');
    catContainerSection.setAttribute('id', 'catContainer');
    document.getElementById("BoardsContainer").appendChild(catContainerSection);
    //For firebase db had to write the below code.
    let arrOfKeys = Object.keys(allCategoryObj);
    for (let categoryCount = 0; categoryCount < arrOfKeys.length; categoryCount++) {
        let catKey = parseInt(arrOfKeys[categoryCount]);
        let singleCatObj = allCategoryObj[catKey];
        let singleCatDiv = document.createElement('div');
        singleCatDiv.setAttribute('id', catKey);
        singleCatDiv.setAttribute('class', 'task-list');
        catContainerSection.appendChild(singleCatDiv);
        let taskHeaderDiv = document.createElement('div');
        taskHeaderDiv.setAttribute('class', 'task-header');
        let singleSpan = document.createElement('span');
        singleSpan.innerText = singleCatObj.name;
        taskHeaderDiv.appendChild(singleSpan);
        singleCatDiv.appendChild(taskHeaderDiv);

        let addTopicButton = document.createElement('div');
        addTopicButton.setAttribute('class', 'addCardButton');
        let addTopic = document.createElement('button');
        addTopic.setAttribute('id', 'save');
        addTopic.setAttribute('class', 'btn btn-primary');

        addTopic.innerText = 'Delete';
        addTopic.addEventListener('click', function (event) {

            let parentCatId = $(this).parent().parent().attr('id');
            firebase.database().ref('/categories/' + parentCatId).once('value').then(function (snapshot) {
                console.dir(snapshot.val());
                return new Promise((resolve, reject) => {
                    let name = snapshot.val().name;
                    console.log("To be deleted category:" + name);
                    resolve(name);
                });
            }).then(name => {
                let isDeleteConfirmed = confirm("Are you sure to delete the category :" + name);
                console.log("isDeleteConfirmed:" + isDeleteConfirmed);
                if (isDeleteConfirmed) {
                    console.log("Delete categoty :" + parentCatId);
                    delteCategoryFromFirebaseById(parentCatId).then(data1 => {
                        getAllCatFromFirebase().then((data => {
                            console.log(data);
                            renderCategoryView(data);
                        }));
                    });
                }
            })

        }, true);
        addTopicButton.appendChild(addTopic);
        singleCatDiv.appendChild(addTopicButton);

        catContainerSection.appendChild(singleCatDiv);

    }
    document.getElementById("BoardsContainer").appendChild(catContainerSection);

}
    }
