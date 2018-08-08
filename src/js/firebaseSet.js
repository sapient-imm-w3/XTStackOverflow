//GET

function  getAllContacts() {
  const userContactref = firebase.database().ref('team-6/channels/');
  userContactref.on('value', (snapshot)=> {
    const getAllContactValue = snapshot.val();
    let getAllContactHtml = '';
    console.log('getContact', getAllContactValue);
    const abc = getAllContactValue.map((contactVal) => {
        console.log(contactVal);
        getAllContactHtml +=
         `
<div>
<div class="buttom-panel text-center mt-1">
<div id="contactDetails">${contactVal.i}</div>
<div>
<button id="muteContact">mute</button>
<button id="unmuteContact">unmute</buttob>
<button id="removeContact">remove</button>
</div>
</form>
</div>
</div>`;

 return getAllContactHtml;
      });
    jQuery('#showContactInformation').append(getAllContactHtml);
  });
}

document.getElementById('userContacts').addEventListener('click',getAllContacts);




// ========== UPDATE ========
function muteContact() {
  const channelN = document.getElementById('contactDetails').testContent;
  const newPostKey = firebase.database().ref(`/channels/${1234567}`).update({
    private: 'public',
  }, (error)
      => {
      if (error) {
        console.log('There is error while saving data into firebase...');
      } else {
        console.log('saved successfully...');
      }
    });
}

jQuery(document).on('click',
  '#muteContact', (e) => {
    e.preventDefault();
    console.log('mute Contact');
    muteContact();
  });

// ============== Set ========
database.ref('questions/').set({
  ///////////////////
  "question": [
    {
      text: "What is clone in Java.",
      description: "I have a script to open a model window.. ",
      date: "20/12/2010",
      categories: [
        {
          name: "javascript",
          id: "1"
        }
      ],
      is_flagged: true,
      flag_count: 0,
      id: 1,
      email: "question@gmail.com",
      answers: [
        {
          text: "Try running the entire script through jslint. This may help point you at the cause of the error.",
          date: "21/12/2010",
          is_flagged: false,
          email: "ans@gmail.com",
          up_vote: 21,
          down_vote: 0,
          is_correct: true,
          id: 1
        },
        {
          text: "Shesh Answers test.",
          date: "21/12/2012",
          is_flagged: true,
          email: "ans_shesh@gmail.com",
          up_vote: 2,
          down_vote: 3,
          is_correct: true,
          id: 2
        }
      ],
      answer_count: 2
    }
  ],
  flagged: [
    {
      questions: [
        {
          id: 1,
          text: "What is clone in Java."
        }
      ],
      answers: [
        {
          id: 1,
          question_id: 1,
          text: "What is clone in Java."
        }
      ]
    }
  ],
  categories: [
    {
      id: "",
      name: "",
      topics: [
        {
          id: "",
          "topic-name": ""
        }
      ]
    }
  ],
  users: [
    {
      id: "",
      name: "",
      role: ""
    }
  ]
  /////////////////
});
//=====Your Get================
function getAnswerFromFileBaseAndUpdate(event) {
  var buttonId = (event.target || event.srcElement).id;
  buttonId = buttonId.trim();
  var index = buttonId.indexOf(buttonId.match(/\d/));
  var countType = buttonId.substring(0, index).toUpperCase();
  var ansId = buttonId.substring(index);
  console.log("Type: " + countType + ", Answer Id:" + ansId);
  // Getting data from Firebase
  var questionId = 0;

  var finalData;
  var answersRef = database.ref('questions/question');
  answersRef.once('value', (questions) => {
    var questionData = Object.values(questions.val());
    console.log(questionData)
    questionData.forEach((ansData) => {
      // ansData = question.val();
      console.log(ansData);
      var answers = ansData.answers;
      if (countType === 'Q') {
        console.log("Question is_flagged:" );
        if (ansData.is_flagged) {
          console.log("Answer is_flagged " + ansData.is_flagged + "--> false");
          finalData = false;
          URL = '/' + questionId+'/is_flagged';
          answersRef.child(URL).set(finalData);
        }
        else {
          console.log("Answer is_flagged " + ansData.is_flagged + "--> true");
          finalData = true;
          URL = '/' + questionId + '/is_flagged';
          answersRef.child(URL).set(finalData);
        }
      } else {
        for (var index = 0; index < answers.length; index++) {
          if (answers[index].id == ansId) {
            if (countType === 'U') {
              console.log("AnsId" + answers[index].id + ", up_vote: " + answers[index].up_vote);
              finalData = answers[index].up_vote + 1;
              URL = '/' + questionId + '/answers/' + index + '/up_vote';
              answersRef.child(URL).set(finalData);
            } else if (countType === 'D') {
              console.log("down_vote" + answers[index].id);
              finalData = answers[index].down_vote + 1;
              URL = '/' + questionId + '/answers/' + index + '/down_vote';
              answersRef.child(URL).set(finalData);
            } else if (countType === 'A') {
              console.log("Answer is_flagged:" + answers[index].id);
              if (answers[index].is_flagged) {
                console.log("Answer is_flagged " + answers[index].is_flagged + "--> false");
                finalData = false;
                URL = '/' + questionId + '/answers/' + index + '/is_flagged';
                answersRef.child(URL).set(finalData);
              }
              else {
                console.log("Answer is_flagged " + answers[index].is_flagged + "--> true");
                finalData = true;
                URL = '/' + questionId + '/answers/' + index + '/is_flagged';
                answersRef.child(URL).set(finalData);
              }
            }
          }
        }
      }
    });
  });
}