import { createStore } from 'redux';
import LandingApp from './LandingApp';
import deepFreeze from 'C:/Users/satreddy/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/deep-freeze';
import {
  ANSWER_ACTION
} from './LandingApp/actions';

import chai from 'chai';
const should = chai.should();

describe('LandingApp', function() {
  describe('answerAction', function() {
    let store = null;
    let initialState = deepFreeze({
      questions: [],
      answers: []
    });

    before(function() {
      store = createStore(LandingApp, initialState);
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
