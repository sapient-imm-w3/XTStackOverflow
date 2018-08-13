import firebase from 'firebase/app';
import "firebase/database";
import 'firebase/auth';

export function render(inputQuestion,categories){
    const d = new Date();
    firebase.database().ref('questions/').push({
      text: inputQuestion.value,
      date: d.toDateString().substr(4),
      categories:categories,
      is_flagged: false,
      flag_count: 0,
      email: firebase.auth().currentUser.email,
      answers: "",
      answer_count: 0,
      photoUrl: firebase.auth().currentUser.photoURL
    });
}



export function getCategories() {
  return new Promise(function(resolve,reject){
    firebase.database().ref('categories/').on('value', (data) => {
      resolve(data);
    });
  })
  
}

