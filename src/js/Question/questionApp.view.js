
export function PostA(){
let postAns = document.getElementById("bod");
  let Ans = document.createElement("textarea");
  Ans.cols="50";
  Ans.rows="5";
  Ans.placeholder="POST your Answer";
  Ans.id="Reply"
  postAns.appendChild(Ans);
  let butt = document.createElement("but");
  butt.className="PostButton btn";
  butt.id="PB";
  butt.innerHTML="POST";
  postAns.appendChild(butt);
}
