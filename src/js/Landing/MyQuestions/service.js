import {database} from "../controller";

export function getQuestions(user){
    return new Promise(function(resolve, reject){
        const db = database.ref(`questions`).orderByChild(`email`).equalTo(user.email);
        db.on('value', (questions) => {
           resolve(questions);    
        });
    })
}
