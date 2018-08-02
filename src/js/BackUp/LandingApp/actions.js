export function ADD_QUESTION(postedBy, text, when, categories) {
  return {
    type: 'ADD_QUESTION',
    postedBy,
    text,
    when,
    answerCount : 0,
    categories
  }
}

export function ANSWER_ACTION(postedBy, text) {
  return {
    type: 'ANSWER',
    postedBy,
    text
  }
}

export function UP_VOTE_ACTION(votedBy, id) {
  return {
    type: 'UP_VOTE',
    votedBy,
    id
  };
}

export function DOWN_VOTE_ACTION(votedBy, id) {
  return {
    type: 'DOWN_VOTE',
    votedBy,
    id
  };
}

export function CLEAR_UP_VOTE_ACTION(votedBy, id) {
  return {
    type: 'CLEAR_UP_VOTE',
    votedBy,
    id
  };
}

export function CLEAR_DOWN_VOTE_ACTION(votedBy, id) {
  return {
    type: 'CLEAR_DOWN_VOTE',
    votedBy,
    id
  };
}

export function SET_CORRECT_ANSWER_ACTION(id) {
  return {
    type: 'SET_CORRECT_ANSWER',
    id
  };
}

export function EDIT_ANSWER_ACTION(postedBy, id, text) {
  return {
    type: 'EDIT_ANSWER',
    postedBy,
    id,
    text
  };
}

export function FLAG_RESPONSE_ACTION(flaggedBy, id, reason) {
  return {
    type: 'FLAG_RESPONSE',
    flaggedBy,
    id,
    reason
  };
}

export function UNFLAG_RESPONSE_ACTION(flaggedBy, id) {
  return {
    type: 'UNFLAG_RESPONSE',
    flaggedBy,
    id
  };
}
