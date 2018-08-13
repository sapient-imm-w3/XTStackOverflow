
import { render } from './index.AskAQuestion.service';

export function askQuestionLayout(){
  return createHTMLElement(` 
  <div id="askQuestionForm"></div>`)
}

export function renderView(categories) {
  let dropdown = ``;
  categories.forEach(category => {
    dropdown +=  `
    
              <input  name="category" id="${category.child(`name`).val()}" type="checkbox" value="${category.child(`name`).val()}">
              <label for="${category.child(`name`).val()}">
              ${category.child(`name`).val()}
              </label>
              
    `;
  });
  const div = createHTMLElement(`<div  style="width:750px;margin:auto;"></div>`);
  const inputQuestion = createHTMLElement(`<form>
                <div class="form-group">
                  <label for="defaultFormMessageModalEx" style="font-family:cursive"><strong>Ask me anything:</strong></label><br>
                  <textarea type="text" class="form-control" id="inputQuestion" placeholder="Enter your Question" style="width: 500px;height:200px"></textarea>
                </div>
                <br>
                <label style="font-family:cursive"><strong>Choose Category:</strong></label><br>
                <div id="category">${dropdown}</div>
              <br>
              </form> 
              `);

  
  const button = document.createElement('button');
  button.innerHTML = "Submit";
  button.id = "submit";
  button.addEventListener('click', function (){
    var categories = [];
    $("input[name='category']:checked").each(function () {
      categories.push({
        "name" : $(this).val()
      });
    });
    const inputQuestion = document.getElementById('inputQuestion');
  render(inputQuestion,categories);
  })
  

  div.appendChild(inputQuestion);
  div.appendChild(button);
  // document.getElementById('askQuestionForm').appendChild(div);
  return div;
}

export function createHTMLElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}


