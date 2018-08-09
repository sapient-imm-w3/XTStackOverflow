import firebase from 'firebase/app';
import "firebase/database";


export function render(inputQuestion,inputCategory){
  console.log("inside render");
    const d = new Date();
    // const inputQuestion = document.getElementById('inputQuestion');
    // const inputCategory = document.getElementById('inputCategory');
    const uuidv1 = require('uuid/v1');
    firebase.database().ref('/questions/'+ uuidv1()).set({
      text: inputQuestion.value,
      date: d.toDateString().substr(4),
      categories: [
        {
          name: inputCategory.value,
        }
      ],
      is_flagged: false,
      flag_count: 0,
      email: firebase.auth().currentUser.email,
      answers: "",
      answer_count: 0
    });
}






