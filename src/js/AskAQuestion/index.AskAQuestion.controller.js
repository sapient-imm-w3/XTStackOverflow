
import {renderView, askQuestionLayout} from './index.AskAQuestion.view';
import { getCategories } from './index.AskAQuestion.service';

// document.getElementById('askQuestion').onclick=() => {
export function askNew() {
    document.getElementById(`askQuestion`).appendChild(askQuestionLayout());
    getCategories().then((categories) => {
        document.getElementById(`askQuestionForm`).appendChild(renderView(categories));
    })
}


// document.getElementById('askQuestion').onclick=() => {renderView();}


