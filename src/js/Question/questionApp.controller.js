import { getQuestionData } from "./question.service";
import { getQuestionView } from "./questionApp.view";

getQuestionData().then(data=>{
    console.log(data);
    getQuestionView(data);    
});

