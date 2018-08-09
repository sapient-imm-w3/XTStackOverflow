
import {renderView} from './index.AskAQuestion.view';

document.getElementById('askQuestion').onclick=() => {
    const div = renderView();
    document.getElementById('askQuestionForm').appendChild(div);
}

