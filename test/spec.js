

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xyz = new JSDOM ('<html></html>');
global.document = xyz.window.document;
global.window = new JSDOM(`<html></html>`);
var chai = require('chai');
chai.use(require('chai-dom'));

var expect = chai.expect;

const askQuestion = require('../src/js/AskAQuestion/index.AskAQuestion.view');
const renderFunct = require('../src/js/AskAQuestion/index.AskAQuestion.service');
// const landingPagetrendingview = require('');
// const landingPageMyQuestionview = require('');
// const qna = require('');
// const admin = require('');

var div = document.createElement('div');
        let e = askQuestion.renderView();
        div.appendChild(e);

        // console.log("calling service function",renderFunct.render);

        // var div1 = document.createElement('div');
        // let e1 = landingPagetrendingview.displaytrending();
        // div1.appendChild(e1);


        // var div2 = document.createElement('div');
        // let e2 = landingPageMyQuestionview.viewLayout();
        // div2.appendChild(e2);


        // var div3 = document.createElement('div');
        // let e3 = landingPageMyQuestionview.viewQuestion();
        // div3.appendChild(e3);

        // var div4 = document.createElement('div');
        // let e4 = qna.getPostAnswer();
        // div4.appendChild(e4);


describe('AskAQuestion', function() {

      it('has ask question div',function(){
        expect(div).to.exist
        
          })
          
          it('has inputQuestion id' , function(){
            expect(div.querySelector('#inputQuestion')).to.exist
          })
          it('has inputCategory id' , function(){
            expect(div.querySelector('#inputCategory')).to.exist
          })

          it('has submit id' , function(){
            expect(div.querySelector('#submit')).to.exist
          })

          it('has question textarea' , function(){
            expect(div.querySelector('textarea')).to.exist
          })
          it('has submit button' , function(){
            expect(div.querySelector('button')).to.exist
          })
        //   it('should call render function',function(){
            
        //     div.querySelector('button').click();
        //     expect(renderFunct.render()).to.have.been.called;
        //   })
});

// describe('landing Page trending page', function() {

//     it('has landing page trending div',function(){
//       expect(div1.querySelector('.myQuestion')).to.exist
      
//         })
       
// });
// describe('landing Page myquestion page', function() {

//     it('has landing page askQuestion div',function(){
//       expect(div2.querySelector('.askQuestionDiv')).to.exist
      
//         })
       
// });

// describe('landing Page viewquestion page', function() {

//     it('has landing page viewQuestion div',function(){
//       expect(div3.querySelector('.myQuestion')).to.exist
      
//         })
       
// });

// describe('post answer page', function() {

//     it('post answer div',function(){
//       expect(div4).to.exist
      
//         })

//         it('post answer id',function(){
//             expect(div4.querySelector(post_answer)).to.exist
            
//               })
       
// });
