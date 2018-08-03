import createHTMLElement from '../view';

export function getTitle(category) {
    let title = createHTMLElement(`<div class="card text-white bg-dark border-light" style="max-width: 100%;"><div class="card-header">${category}</div></div>`);
    return title;
 }
 export function getRecQuestion(question) {
    let display = createHTMLElement(`
      <!-- Card -->
      <div  style="border:5px; background: white">
      <a href="" ><p style="margin: 0.5rem">${question}</p></a>
      </div>
      `);
    return display;
 }
  export function viewLayout(){
    //document.body.innerHTML = "";
    let main = createHTMLElement(`<div class="col-md-3">
    <aside style=" background-color: lightgrey; height: 100%;" >
      <div class="container" >
        <h2>Recommended For You</h2>
        <div id="recommended">
        </div>
      </div>
    </aside>
    </div>`);
    document.getElementById(`content`).appendChild(main);
  }
  // float: right; margin: 0 1.5%; width: 30%;