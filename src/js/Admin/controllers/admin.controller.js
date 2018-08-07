import {getAllUserService} from "../admin.service";
import {layout} from '../views/admin.view'
const retrieveUser = document.getElementById("retrieveUser");
retrieveUser.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("hello");
    getAllUserService();
  });

  layout();