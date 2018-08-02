export default function removeFlaggedQuestionReducer(currentState, action) {
    return Object.assign({}, currentState, {answers: [{postedBy: action.postedBy, text: action.text, id: 'abc'}]});
  }