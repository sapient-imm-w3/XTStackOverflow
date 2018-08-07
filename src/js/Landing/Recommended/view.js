import createHTMLElement from '../view';
import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from '../controller';

export function getTitle(category) {
    let title = createHTMLElement(`<div class="card text-white bg-dark border-light" style="max-width: 100%;"><div class="card-header">${category}</div></div>`);
    return title;
 }
 export function getRecQuestion(question,key) {
    let display = createHTMLElement(`
      <!-- Card -->
      <div  style="border:5px; background: white">
      <a href="#" id="${key}"><p style="margin: 0.5rem">${question}</p></a>
      </div>
      `);
    return display;
 }
  export function viewLayout(){
    let main = createHTMLElement(`<div class="col-md-3">
    <aside style=" background-color: lightgrey; height: 100%;" >
      <div class="container" >
        <h2>Recommended For You</h2>
        <div id="recommended">
        </div>
      </div>
      <button type="button" id="signout" class="btn btn-danger">Sign Out</button>
    </aside>
    </div>`);
    document.getElementById(`content`).appendChild(main);
    document.getElementById(`signout`).onclick = function() {
      console.log(auth.currentUser);
        auth.signOut()
        .then(()=>{
          close();
          console.log("Successfully Logged OUt..!!!");
          close_window();
        });
    }
    function close_window() {
      if (confirm("Close Window?")) {
        document.getElementById(`content`).innerHTML = "";
        let html = `<marquee scrollamount="12" style="font-size: 50px; margin-top: 20%; color: green">Successfully Logged Out..!!!</marquee>`;
        document.getElementById(`content`).appendChild(createHTMLElement(html));

      }
    }
  }
  