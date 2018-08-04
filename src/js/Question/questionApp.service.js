import {generateRandomId} from './questionApp.controller'



export function PostAnswer(){
    const headerContent = document.querySelector('#Reply').value;
    console.log(headerContent);
    var d = new Date();
    const datestring = d.toDateString();
    let AnsId = generateRandomId();
    const getUrl = 'http://localhost:3000/questions/1';
    fetch(getUrl)
    .then((resp)=>resp.json()).then(function(obj){
      const postUrl = 'http://localhost:3000/questions/1';
      const data = {
        text:headerContent,
        date:datestring,
        is_flagged:false,
        email:"A@gmail.com",
        up_vote:"0",
        down_vote:"0",
        is_correct:false,
        id:AnsId
      }
      obj.answers.push(data);
      obj.answer_count=parseInt(obj.answer_count)+1;
      const fetchDat = {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(obj),
      };
      fetch(postUrl, fetchDat);
    })
  

}


// export function fetchQues(QuesId){
    
//         const getUrl = 'http://localhost:3000/questions/${QuesId}';
//         fetch(getUrl)
//           .then(resp => resp.json())
//           .then((data) => {
          
            
//           });
//       }

export function fetchQues(){
    
    const getUrl = 'http://localhost:3000/questions/1';
    fetch(getUrl)
      .then(resp => resp.json())
      .then((data) => {
      
        console.log(data);
      });
  }
