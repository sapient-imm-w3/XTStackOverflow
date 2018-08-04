import { PostAnswer ,fetchQues} from "./questionApp.service";
import {PostA} from "./questionApp.view";

export function generateRandomId() {
    return Math.floor((Math.random() * 10000000000) + 1);
    } 
PostA();
fetchQues();
document.getElementById('PB').addEventListener('click', PostAnswer);
