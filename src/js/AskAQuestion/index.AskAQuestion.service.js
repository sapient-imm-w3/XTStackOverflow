import firebase from 'firebase/app';
import "firebase/database";

export function render(inputQuestion,categories){
    const d = new Date();
    const uuidv1 = require('uuid/v1');
    firebase.database().ref('/questions/'+ uuidv1()).set({
      text: inputQuestion.value,
      date: d.toDateString().substr(4),
      categories:categories,
      is_flagged: false,
      flag_count: 0,
      email: firebase.auth().currentUser.email,
      answers: "",
      answer_count: 0
    });
}



export function getCategories() {
  return new Promise(function(resolve,reject){
    firebase.database().ref('categories/').on('value', (data) => {
      resolve(data);
    });
  })
  
}

