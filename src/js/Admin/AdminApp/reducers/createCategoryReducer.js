export default function createCategoryReducer(currentState, action) {
  return Object.assign({}, currentState, {
    category: [{
      text: action.text, 
      id: 'abc'
    }]
  });
}