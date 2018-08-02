export default function deleteCategoryReducer(currentState, action) {
  return Object.assign({}, currentState, {
    answers: [{
      text: action.text, 
      id: 'abc'
    }]
  });
}