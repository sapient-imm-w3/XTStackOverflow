//import renderView from './index.AskAQuestion.view';


export function render(){
    const addUrl = "http://localhost:3000/questions";
    var d = new Date();
    //console.log(d);




 
    
 
    






    const inputQuestion = document.getElementById('inputQuestion');
    const inputCategory = document.getElementById('inputCategory');
    //console.log(inputCategory.value);
    //console.log(inputQuestion.value);
const jsonString =  {
    "text": inputQuestion.value,
    "date": d,
    "categories": [
      {
        "name": inputCategory.value,
        "id": "xyz"
      }
    ],
    "is_flagged": false,
    "flag_count": 0,
    "email": "",
    "answers": [],
    "answer_count": 0
  };



  let fetchData = {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin", 
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    redirect: "follow", 
    referrer: "no-referrer", 
    body: JSON.stringify(jsonString) 
}

fetch(addUrl, fetchData)
.then();
}




