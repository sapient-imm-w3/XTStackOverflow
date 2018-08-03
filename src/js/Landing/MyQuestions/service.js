import { viewQuestion } from "./view";

export function getQuestions(){
    const url = "http://localhost:3000/questions?email=user1"; // user1 needs to be changed after auth
    fetch(url)
    .then((resp) => resp.json())
    .then((questions)=>{
        questions.forEach(question => {
            viewQuestion(question);
        });
    })
}
