// import firebase from 'firebase/app';
// import 'firebase/database';

// var config = {
//     apiKey: "AIzaSyA5LE9PObCxc3tX0ZeFx2gdW2F102HeoOg",
//     authDomain: "stackoverflowxt.firebaseapp.com",
//     databaseURL: "https://stackoverflowxt.firebaseio.com",
//     projectId: "stackoverflowxt",
//     storageBucket: "",
//     messagingSenderId: "1082794399425"
//   };
//   firebase.initializeApp(config);

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xyz = new JSDOM ('<html></html>');
global.document = xyz.window.document;
global.window = new JSDOM(`<html></html>`);
var chai = require('chai');
chai.use(require('chai-dom'));

var expect = chai.expect;

const askQuestion = require('../src/js/AskAQuestion/index.AskAQuestion.view');
// const renderFunct = require('../src/js/AskAQuestion/index.AskAQuestion.service');


var div = document.createElement('div');
        let e = askQuestion.renderView();
        div.appendChild(e);

    

describe('AskAQuestion', function() {

      it('has ask question div',function(){
        expect(div).to.exist
        
          })
          
          it('has inputQuestion id' , function(){
            expect(div.querySelector('#inputQuestion')).to.exist
          })
        //   it('has inputCategory id' , function(){
        //     expect(div.querySelector('#inputCategory')).to.exist
        //   })

          it('has submit id' , function(){
            expect(div.querySelector('#submit')).to.exist
          })

          it('has question textarea' , function(){
            expect(div.querySelector('textarea')).to.exist
          })
          it('has submit button' , function(){
            expect(div.querySelector('button')).to.exist
          })
          it('should call render function',function(){

            (div.querySelector('#inputQuestion')).innerHTML = "what is firebase";
           
            div.querySelector('button').click();
           

          })
});

