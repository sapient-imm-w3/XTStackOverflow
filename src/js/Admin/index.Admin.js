import {createUser,getAllUsers,changeOfRole,getFlaggedAnswers} from  './admin.service';
import '../../css/index.css';
import './controllers/admin.controller';
import '../../../node_modules/jquery/dist/jquery.js'
import $ from 'jquery';
import '../../vendors/DataTables/css/jquery.dataTables.min.css';
import '../../vendors/DataTables/js/jquery.dataTables.min';
// import 'bootstrap/scss/bootstrap.scss';

// createUser().then(data => {
//     console.log("Creating the new user");
//     console.table(data);
//  });

// getAllUsers().then(data =>  {
//   //  console.log(data);
// });

// changeOfRole("user1");

// getFlaggedAnswers().then(data => {
//     console.log("flagged answers");
//     console.log(data.answers);
// });

// $(document).ready(function() {
//   var table = $('#example').DataTable( {
//       select: true
//   } );

//   table
//       .on( 'user-select', function ( e, dt, type, cell, originalEvent ) {
//           if ( $(originalEvent.target).index() === 0 ) {
//               e.preventDefault();
//           }
//       } );
// } );
