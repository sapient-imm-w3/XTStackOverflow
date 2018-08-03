

export function createHTMLElement(html){
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}
export function getTitle(category) {
   let title = createHTMLElement(`<div class="card text-white bg-dark border-light" style="max-width: 100%;"><div class="card-header">${category}</div></div>`);
   return title;
}
export function getRecQuestion(question) {
   let display = createHTMLElement(`
     <!-- Card -->
     <div  style="border:5px; background: white">
     <p style="margin-top: 0.5rem; margin-bottom: 0.5rem;">${question}</p>
     </div>
     `);
   return display;
}
 export function viewLayout(){
   document.body.innerHTML = "";
   let main = createHTMLElement(`<aside style="float: right; margin: 0 1.5%; width: 30%; background-color: lightgrey; height: 100%;" >
     <div class="container" >
       <h2>Recommended For You</h2>
       <div id="recommended">

       </div>
     </div>
   </aside>`);
   document.body.appendChild(main);
 }
