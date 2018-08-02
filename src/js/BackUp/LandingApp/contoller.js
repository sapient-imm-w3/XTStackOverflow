import { createStore } from 'redux';
import LandingApp from './index';

import { ADD_QUESTION } from './actions';
import deepFreeze from 'deep-freeze';

let initialState = deepFreeze({
    questions: [],
    categories: []
  });

let store = createStore(LandingApp, initialState);


document.getElementById('Add').onclick = () => {
const action = ADD_QUESTION('user1', 'My long text here...', new Date(), new Array("javaScript","HTML"));
store.dispatch(action);
}

store.subscribe(() => {
        let questions = store.getState().questions;
        let html = questions[0].text + questions[0].categories;
        document.getElementById("div").innerHTML = html;
});