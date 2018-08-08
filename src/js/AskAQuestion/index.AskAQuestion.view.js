
import { render } from './index.AskAQuestion.service';

export function renderView() {



  const div = createHTMLElement(`<div  style="width:750px;margin:auto;"></div>`);
  const inputQuestion = createHTMLElement(`<form>
                <div class="form-group">
                  <label for="defaultFormMessageModalEx" style="font-family:cursive"><strong>Ask me anything:</strong></label><br>
                  <textarea type="text" class="form-control" id="inputQuestion" placeholder="Enter your Question" style="width: 500px;height:200px"></textarea>
                </div>
                <br>
                <label style="font-family:cursive"><strong>Enter Category:</strong></label><br>
                <textarea type="text" class="form-control" id="inputCategory" placeholder="Enter Category" style="width: 500px;height:50px"></textarea>
              <br>
              </form> 
              `);
  const button = document.createElement('button');
  button.innerHTML = "Submit";
  button.id = "submit";
  button.onclick = () => { render(); }
  div.appendChild(inputQuestion);
  div.appendChild(button);
  document.getElementById('askQuestionForm').appendChild(div);

}

export function createHTMLElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}


