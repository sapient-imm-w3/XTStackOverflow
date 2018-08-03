import {getTitle, getRecQuestion} from './view';

export function getRecommended() {
  const id =1;
  let getUrl = `http://localhost:3000/users/${id}`;
  fetch(getUrl)
  .then((resp) => resp.json())
  .then((data) => {
    data.fav_categories.map(function(cat){
      let get1Url = `http://localhost:3000/questions?is_flagged=false`;
    document.getElementById('recommended').innerHTML = "";
    fetch(get1Url)
    .then((resp) => resp.json())
    .then((data) => {
    let rec = data;
    console.log(rec);
    let title = getTitle(cat);
    document.getElementById('recommended').appendChild(title);
    let count = 0;
    return rec.map((rec) => {
      if(count<5){
      for(let i=0; i< rec.categories.length; i++){
        if(rec.categories[i].name==cat){
            let display = getRecQuestion(rec.text);
            document.getElementById('recommended').appendChild(display);
            count++;
            break;
            }
          }
        }
      })
    })
    })
    
  })
}