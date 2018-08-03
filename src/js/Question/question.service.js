import { getQuestionView } from "./questionApp.view";

export const getQuestionData = () =>{
    var getUrl = "http://localhost:3000/questions";

    fetch(getUrl)
        .then((resp)=>resp.json())
        .then((data) =>{
            getQuestionView(data);
        })
        .catch((error)=> {
            console.log(error);
        });
}