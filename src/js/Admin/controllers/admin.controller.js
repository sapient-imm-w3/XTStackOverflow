import {getAllUserService} from "../admin.service";
import {layout} from '../views/admin.view'
const retrieveUser = document.getElementById("retrieveUser");
retrieveUser.addEventListener('click', (event) => {
    event.preventDefault();
    getAllUserService();
  });

  layout();