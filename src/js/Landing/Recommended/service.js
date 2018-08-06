import {getTitle, getRecQuestion} from './view';
import {database} from "../index.landing";

export function getRecommended(){
  const db = database.ref(`users/0/fav_categories`);
  const dbq = database.ref(`questions`);
  let rec;
  dbq.on('value',(data) => {
    rec = data;
  });

  db.on('value',(data)=>{
      data.forEach((category) => {
        let title = getTitle(category.val());
      document.getElementById('recommended').appendChild(title);
      let count = 0;
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