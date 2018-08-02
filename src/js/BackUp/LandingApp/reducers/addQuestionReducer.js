export function addQuestionReducer(currentState, action) {
  return Object.assign({}, currentState, {
    questions: [{
      postedBy: action.postedBy, text: action.text, id: 'abc',
      when: action.when, categories: action.categories
    }]
  });
}