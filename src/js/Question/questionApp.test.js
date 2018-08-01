import { createStore } from 'redux';
import QuestionApp from './QuestionApp';
import deepFreeze from 'deep-freeze';
import {
  ANSWER_ACTION
} from './QuestionApp/actions';

import chai from 'chai';
const should = chai.should();

describe('QuestionApp', function() {
  describe('answerAction', function() {
    let store = null;
    let initialState = deepFreeze({
      questions: [],
      answers: []
    });

    before(function() {
      store = createStore(QuestionApp, initialState);
    });

    it('should containResponse', function() {
      const action = ANSWER_ACTION('user1', 'My long text here...');

      store.dispatch(action);
      store.getState().should.have.property('answers').to.be.an('array').and.have.lengthOf(1);
      store.getState().answers.filter(a => a.postedBy === 'user1')[0].should.include.all.keys('postedBy', 'text', 'id');
      store.getState().answers.filter(a => a.postedBy === 'user1')[0].should.nested.include({'postedBy': action.postedBy, text: action.text});
    });
  });
});
