import {createUser,getAllUsers,changeOfRole,getFlaggedAnswers} from  './admin.service'

// createUser().then(data => {
//     console.log("Creating the new user");
//     console.table(data);
//  });

getAllUsers().then(data => {
  //  console.log(data);
});

changeOfRole("user1");

getFlaggedAnswers().then(data => {
    console.log("flagged answers");
    console.log(data.answers);
});
