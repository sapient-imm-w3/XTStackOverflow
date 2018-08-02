import changeRoleReducer from './reducers/changeRoleReducer';
import createCategoryReducer from './reducers/createCategoryReducer';
import deleteCategoryReducer from './reducers/deleteCategoryReducer';
import removeFlaggedAnswerReducer from './reducers/removeFlaggedAnswerReducer';
import removeFlaggedQuestionReducer from './reducers/removeFlaggedQuestionReducer';


export default function AdminApp(currentState = {}, action) {
  switch(action.type) {
    case 'FLAGGED_QUESTION':
      return removeFlaggedQuestionReducer(currentState, action);
    case 'FLAGGED_ANSWER':
      return removeFlaggedAnswerReducer(currentState, action);
    case 'ROLE':
      return changeRoleReducer(currentState, action);
    case 'CREATE_CATEGORY':
      return createCategoryReducer(currentState, action);
    case 'DELETE_CATEGORY':
      return deleteCategoryReducer(currentState, action);
    default:
      return currentState;
  }
}