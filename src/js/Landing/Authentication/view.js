import createHTMLElement from '../view';
import $ from 'jquery';
import {updateCategories} from './service';

export function createModal(){
    let modal = createHTMLElement(`<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
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
         <button id="saveCategories" type="button" class="btn btn-primary" data-dismiss="modal" >Save changes</button>
       </div>'
     </div>
   </div>
  </div>`);

  modal.firstElementChild.firstElementChild.firstElementChild
  .nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.addEventListener('click',() => {
    let favorite = [];
      $("input[name='category']:checked").each(function () {
        favorite.push($(this).val());
      });
      updateCategories(favorite);
  })
  return modal;
}

export function displayFavCategories(category) {
    let cat = `
            <label class="btn btn-warning labelCategories">
            <input style="display:none" name="category" id="${category.child(`name`).val()}" type="checkbox" value="${category.child(`name`).val()}">
            <label for="${category.child(`name`).val()}">
                ${category.child(`name`).val()}
            </label>
            </label> 
        `;
    let catElement = createHTMLElement(cat);
    catElement.addEventListener('click',() => {
    let check = catElement.firstElementChild.checked;
    if (check == true) {
        catElement.className = "btn btn-success labelCategories";
    } else {
        catElement.className = "btn btn-warning labelCategories";
    }
    });
    return catElement;
}