

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
