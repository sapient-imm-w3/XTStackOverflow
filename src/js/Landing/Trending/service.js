import { displaytrending } from './views';

export function getAllFromDB() {
    let action = {
        method: "GET"
    }
    let url = "http://localhost:3000/questions?is_flagged=false";
    return fetch(url, action)
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => {
            console.log(data);
        })
        .catch(e => console.log(`ERROR:: ${e}`));

}
export function getAnswerCountFromDB() {
    let action = {
        method: "GET"
    }
    let url = "http://localhost:3000/questions?is_flagged=false";
    return fetch(url, action)
        .then((resp) => resp.json()) // Transform the data into json
        .then(data => {
            data.map(function(data){
                displaytrending(data.answer_count,data.text,data.date);
            })
        // console.log(data[0].answer_count);
        
        })
        .catch(e => console.log(`ERROR:: ${e}`));

}