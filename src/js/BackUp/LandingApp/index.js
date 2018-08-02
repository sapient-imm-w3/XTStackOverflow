import answerReducer from './reducers/answerReducer';
import upVoteReducer from './reducers/upVoteReducer';
import downVoteReducer from './reducers/downVoteReducer';
import clearUpVoteReducer from './reducers/clearUpVoteReducer';
import clearDownVoteReducer from './reducers/clearDownVoteReducer';
import setCorrectAnswerReducer from './reducers/setCorrectAnswerReducer';
import editAnswerReducer from './reducers/editAnswerReducer';
import flagResponseReducer from './reducers/flagResponseReducer';
import unFlagResponseReducer from './reducers/unFlagResponseReducer';
import {addQuestionReducer} from './reducers/addQuestionReducer';

export default function LandingApp(currentState = {}, action) {
  switch(action.type) {
    case 'ADD_QUESTION':
      return addQuestionReducer(currentState, action);
    case 'ANSWER':
      return answerReducer(currentState, action);
    case 'UP_VOTE':
      return upVoteReducer(currentState, action);
    case 'DOWN_VOTE':
      return downVoteReducer(currentState, action);
    case 'CLEAR_UP_VOTE':
      return clearUpVoteReducer(currentState, action);
    case 'CLEAR_DOWN_VOTE':
      return clearDownVoteReducer(currentState, action);
    case 'SET_CORRECT_ANSWER':
      return setCorrectAnswerReducer(currentState, action);
    case 'EDIT_ANSWER':
      return editAnswerReducer(currentState, action);
    case 'FLAG_RESPONSE':
      return flagResponseReducer(currentState, action);
    case 'UNFLAG_RESPONSE':
      return unFlagResponseReducer(currentState, action);
    default:
      return currentState;
  }
}