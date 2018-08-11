
import {renderView} from './index.AskAQuestion.view';
import { getCategories } from './index.AskAQuestion.service';

document.getElementById('askQuestion').onclick=() => {

    getCategories().then((categories) => {
        document.getElementById(`askQuestionForm`).appendChild(renderView(categories));
    })
}


// document.getElementById('askQuestion').onclick=() => {renderView();}


