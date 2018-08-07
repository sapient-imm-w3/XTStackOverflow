import firebase from 'firebase/app';
import 'firebase/auth';
import createHTMLElement from '../view';

export function displaytrending(answerCount,text,date,categories,key) {
    let html = `<div class="myQuestion">
    <div class="row">
    <div id="answer-count" class="col-md-3 row text-muted text-center answerCount">
                    ${answerCount}<br>
                    answers
                </div>
                <div id="" class="col-md-9">
                <a href="#" id="${key}">${text}</a> <br>`;

            categories.forEach(element => {
               html+= `<span style="font-size: 15px;" class="badge badge-secondary">${element.name}</span> &nbsp;`
            });
    
              html += `<br> <small id="date" class = "text-muted" style="float: right">${date}</small>
</div>  
</div>  
    </div>
    `;
document.getElementById("trendingDiv").appendChild(createHTMLElement(html));
document.getElementById(`${key}`).onclick = () => {
    event.preventDefault();
    console.log(`${key}`);
}
    
}

export function viewLayout(){
    document.body.innerHTML = "";
    document.body.className = "";
    let main = createHTMLElement(`
    <content class="row"  id="content">
    <div  class="col-md-9" id="mainPart">
    <h3>Hello, ${firebase.auth().currentUser.displayName}</h3>
    <section id="trendingSection">
    <h2>Recent Posts</h2>
    <div id="trendingDiv">
    </div>
    </section>
    </div>
    </content>`);
    document.body.appendChild(main);
  }

  