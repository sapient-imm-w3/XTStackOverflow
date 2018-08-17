import firebase from 'firebase/app';
import "firebase/database";
import 'firebase/auth';
import { Category } from '../Admin/services/admin.service';

export function render(inputQuestion,categories){
    const d = new Date();
    const id = firebase.database().ref('questions/').push({
      text: inputQuestion.value,
      date: d.toDateString().substr(4),
      is_flagged: false,
      categories: [],
      flag_count: 0,
      email: firebase.auth().currentUser.email,
      answers: "",
      answer_count: 0,
      photoUrl: firebase.auth().currentUser.photoURL
    });
    categories.forEach(category => {
      firebase.database().ref(`questions/${id.key}/categories/${category.id}`).set({
        "name" : category.name
      })
    });
}



export function getCategories() {
  return new Promise(function(resolve,reject){
    firebase.database().ref('categories/').on('value', (data) => {
      resolve(data);
    });
  })
  
}

