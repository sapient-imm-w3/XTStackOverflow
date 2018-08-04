
import {getAllCategoriesWithTopics,Category,getAllCategories,getCategoryById,deleteCategoryById,createCategory,updateCategory} from './AdminApp/services/adminapp.service';
import {renderCategoryView} from './AdminApp/views/adminapp.view'
import './AdminApp/controller/adminapp.controller'
import  '../../../node_modules/bootstrap/dist/css/bootstrap.css';
//import '../../../node_modules/bootstrap/'
//import "../../../node_modules/jquery/dist/jquery.js";
//import "../../../node_modules/popper.js/dist/popper.js";
//import popper from '../../../node_modules/popper.js/dist/umd/popper'
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
//import "../../../node_modules/bootstrap/scss/bootstrap.scss";

import '../../css/index.css'
//import bootstrap from  '../../../node_modules/bootstrap/dist/css/bootstrap'


getAllCategoriesWithTopics().then(data => {
    console.log(data);
    renderCategoryView(data);
});

/*
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
*/
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