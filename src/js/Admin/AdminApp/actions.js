export function REMOVE_FLAGGED_QUESTION_ACTION(isFlagged, id) {
  return {
    type: 'FLAGGED_QUESTION',
    isFlagged,
    id
  }
}

export function REMOVE_FLAGGED_ANSWER_ACTION(isFlagged, id) {
  return {
    type: 'FLAGGED_ANSWER',
    isFlagged,
    id
  };
}

export function CHANGE_ROLE_ACTION(name, role) {
  return {
    type: 'ROLE',
    name,
    role
  };
}

export function CREATE_CATEGORY_ACTION(category, id) {
  return {
    type: 'CREATE_CATEGORY',
    category,
    id
  };
}

export function DELETE_CATEGORY_ACTION(category, id) {
  return {
    type: 'DELETE_CATEGORY',
    category,
    id
  };
}

