export default function changeRoleReducer(currentState, action) {
  return Object.assign({}, currentState, {
    users: [{
      role:'admin'
    }]
  });
}