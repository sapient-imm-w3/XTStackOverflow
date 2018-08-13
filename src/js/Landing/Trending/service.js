import {database} from "../../firebase.database";

export function getAnswerCountFromDB() {
  return new Promise(function(resolve, reject){
        const db = database.ref(`questions`).limitToLast(5);
        db.on('value', (data) => {
          resolve(data);  
        });
      })
}

export function getCatQuestions() {
    
    const dbq = database.ref(`questions`);
    return new Promise(function(resolve, reject){
      dbq.on('value', (questions) => {
        return resolve(questions);
    });
    })
    
}