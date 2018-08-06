import {getTitle, getRecQuestion} from './view';
import {database} from "../controller";

export function getRecommended(user){
  
  const dbq = database.ref(`questions`);
  const db = database.ref(`users/`+user.uid+`/fav_categories`);
  let rec;
  dbq.on('value',(data) => {
    console.log(data);
    rec = data;
  });

  db.on('value',(data)=>{
      data.forEach((category) => {
        let title = getTitle(category.val());
      document.getElementById('recommended').appendChild(title);
      let count = 0;
      console.log(rec);
      return rec.forEach((rec) => {
        if(count<5){
          rec.child(`categories`).val().forEach((cat) => {
          if(cat.name===category.val()){
              let display = getRecQuestion(rec.child(`text`).val());
              document.getElementById('recommended').appendChild(display);
              count++;
              }
            })
          }
        })
      })
  })
}