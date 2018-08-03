import createHTMLElement from '../view';

export function displaytrending(answerCount,text,date) {
    let html = `<div class="myQuestion">
    <div class="row">
    <div id="answer-count" class="col-md-3 row text-muted text-center answerCount">
                    ${answerCount}<br>
                    answers
                </div>
                <div id="question" class="col-md-9">
                <a href="#">${text}</a>
               <br> <small id="date" class = "text-muted" style="float: right">${date}</small>
</div>  
</div>  
    </div>
    `;
document.getElementById("trendingDiv").appendChild(createHTMLElement(html));
    
}

export function viewLayout(){
    document.body.innerHTML = "";
    let main = createHTMLElement(`<content class="row"  id="content">
    <div  class="col-md-9" id="mainPart">
    <section id="trendingSection">
    <h2>Recent Posts</h2>
    <div id="trendingDiv">
        
    </div>
    </section>
    </div>
    </content>`);
    document.body.appendChild(main);
  }

  