import createHTMLElement from '../view';

export function displaytrending(answerCount,text,date,categories) {
    let html = `<div class="myQuestion">
    <div class="row">
    <div id="answer-count" class="col-md-3 row text-muted text-center answerCount">
                    ${answerCount}<br>
                    answers
                </div>
                <div id="" class="col-md-9">
                <a href="#">${text}</a> <br>`;

            categories.forEach(element => {
               html+= `<span style="font-size: 15px;" class="badge badge-secondary">${element}</span> &nbsp;`
            });
    
              html += `<br> <small id="date" class = "text-muted" style="float: right">${date}</small>
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

  