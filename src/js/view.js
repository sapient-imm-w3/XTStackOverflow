import { auth } from './firebase.database';
import { displayPage } from './controller'
import { createHTMLElement } from "./AskAQuestion/index.AskAQuestion.view";

export function displayNav() {
  let nav = createHTMLElement(`<ul class="navbar-nav" id="navList">
    <li class="nav-item">
      <a class="nav-link" href="#" id="home">Home
      </a>
    </li>
  </ul>`);
  nav.firstElementChild.firstElementChild.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById(`askQuestion`).innerHTML = "";
    document.getElementById(`questionAnswer`).innerHTML = "";
    document.getElementById(`landing`).innerHTML = "";
    document.getElementById('landing').appendChild(displayPage(auth.currentUser));
  })

  return nav;
}

export function displayNavAdmin() {
  let nav = createHTMLElement(`<ul class="navbar-nav mr-auto" id="navList">
    <li class="nav-item">
      <a class="nav-link" id="flagged" href="#">Flagged
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="retrieveUser" href="#">Users</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="retrieveCategories" href="#">Categories</a>
    </li>
  </ul>`);

  return nav;
}

export function displaySignOut() {
  let li = createHTMLElement(`<li class="nav-item">
      <a class="nav-link" id="signOut" href="#">Sign Out</a>
    </li>`);

  li.firstElementChild.addEventListener(`click`, () => {
    auth.signOut()
      .then(() => {
        close_window();
      });
  })

  return li;
}

function close_window() {
  if (confirm("Close Window?")) {
    document.body.innerHTML = "";
    let html = `<div style="font-size: 50px; margin-top: 20%; margin-left: 35%; color: green">Successfully Logged Out..!!!</div>`;
    document.body.appendChild(createHTMLElement(html));

  }
}