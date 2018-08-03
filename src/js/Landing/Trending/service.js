import { displaytrending } from './views';

export function getAnswerCountFromDB() {
    let action = {
        method: "GET"
    }
    let url = "http://localhost:3000/questions?is_flagged=false";
    return fetch(url, action)
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => {
            let questions;
            if(data.length<5){
                questions = data;
            }
            else{
                questions = data.splice(-5,5);
            }
            questions.map(function(data){
                displaytrending(data.answer_count,data.text,data.date);
            })
        
        })
        .catch(e => console.log(`ERROR:: ${e}`));

}