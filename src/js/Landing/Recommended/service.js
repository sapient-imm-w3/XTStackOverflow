import { database } from "../../firebase.database";

export function getRecommended(user) {
  return new Promise(function(resolve, reject){
    const dbq = database.ref(`questions`).orderByChild(`is_flagged`).equalTo(false);
    dbq.on('value', (questions) => {
      resolve(questions);
    });
});
}

export function getRec(user) {
  return new Promise(function(resolve, reject){
    const db = database.ref(`users/` + user.uid + `/fav_categories`);
    db.on('value',function(data){
      resolve(data);
    });
  });
}