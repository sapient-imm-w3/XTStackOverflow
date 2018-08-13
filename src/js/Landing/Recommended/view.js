import createHTMLElement from '../view';
import { auth } from '../../firebase.database';
import { setDom } from '../../Question/questionApp.controller';

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
      display.firstElementChild.addEventListener('click',(event) => {
        event.preventDefault();
        document.getElementById(`landing`).innerHTML = "";
        setDom(`${key}`);
      });
    return display;
 }
 export function noRecQuestions(category){
   let html = ` <div  style="border:5px; background: white; text-align: center">
   <p style="margin: 0.5rem;
   padding: 0.5rem;
   color: red;
   font-style: italic;">No Questions under ${category}</p>
   </div>`;
   return createHTMLElement(html);
   
 }
  export function viewLayout(){
    let main = `<div class="col-md-3">
    <aside style=" background-color: lightgrey; height: 100%;" >
      <div class="container" >
        <h2>Recommended For You</h2>
        <div id="recommended">
        </div>
      </div>
      <button type="button" id="signout" class="btn btn-danger">Sign Out</button>
    </aside>
    </div>`;

    let mainElement = createHTMLElement(main);
    mainElement.firstElementChild.firstElementChild.nextElementSibling.addEventListener('click', () => {
      auth.signOut()
      .then(()=>{
        close();
        close_window();
      });
    })

    return mainElement;
        
    }

    function close_window() {
      if (confirm("Close Window?")) {
        document.getElementById(`content`).innerHTML = "";
        let html = `<marquee scrollamount="12" style="font-size: 50px; margin-top: 20%; color: green">Successfully Logged Out..!!!</marquee>`;
        document.getElementById(`content`).appendChild(createHTMLElement(html));

      }
    }
  