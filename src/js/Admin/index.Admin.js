
import {Category,getAllCategories,getCategoryById,deleteCategoryById,createCategory,updateCategory} from './AdminApp/services/adminapp.service';



getAllCategories().then(data => {
    console.log(data);
    renderView(data);
});
function renderView(_arrOfCategories){
    for(let catCount = 0;catCount<_arrOfCategories.length;catCount++){
let singleCategoryObj = _arrOfCategories[catCount];
console.log(singleCategoryObj.name);
    }
}

function createCategoryObj(){
let catObj = new Category("Spring",[]);
createCategory(catObj);
}
createCategoryObj();
deleteCategoryById(100);

/*
let arrOfCAt = getAllCategories1();
console.log(arrOfCAt.length);
*/
//console.table(arrOfCategories);
/*
getCategoryById(1).then(data => {
    console.log("retrieving single data");
    console.log(data)
});

deleteCategoryById(1).then(data => {
    console.log("Deleting single data");
    console.log(data)
});
*/
//createCategory();
//updateCategory(1);
// console.log("No of category:",    sarrOfCategories.length);