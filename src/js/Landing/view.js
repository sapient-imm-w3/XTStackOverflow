import $ from 'jquery';
import { updateCategories } from './service';
export default function createHTMLElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}

export function displayFavCategories(categories) {

  let html = `<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Choose your Favourite Categories</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div> <div class="modal-body" id="modalBody">
        </div><div class="modal-footer">
       <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
       <button id="saveCategories" type="button" class="btn btn-primary" >Save changes</button>
     </div>'
   </div>
 </div>
</div>`
  document.body.appendChild(createHTMLElement(html));
  categories.forEach(element => {
    let cat = `
            <label class="btn btn-warning labelCategories">
            <input style="display:none" name="category" id="${element.child(`name`).val()}" type="checkbox" value="${element.child(`name`).val()}">
            <label for="${element.child(`name`).val()}">
                ${element.child(`name`).val()}
            </label>
            </label> 
       `;
    let htmlElement = createHTMLElement(cat);
    document.getElementById(`modalBody`).appendChild(htmlElement);
    htmlElement.onclick = function () {
      let check = document.getElementById(`${element.child(`name`).val()}`).checked;
      if (check == true) {
        this.className = "btn btn-success labelCategories";
      } else {
        this.className = "btn btn-warning labelCategories";
      }
    };

  });

  $('#exampleModalLong').modal('show');

  document.getElementById(`saveCategories`).onclick = () => {
    var favorite = [];
    $("input[name='category']:checked").each(function () {
      favorite.push($(this).val());
    });
    updateCategories(favorite);
  }

}

