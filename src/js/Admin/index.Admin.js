import '../../vendors/DataTables/css/jquery.dataTables.min.css';
import 'bootstrap/scss/bootstrap.scss';
import '../../css/index.css';
import 'jquery';
import $ from 'jquery';
import '../../vendors/DataTables/js/jquery.dataTables.min.js';
import '../Admin/views/admin.view';
import '../Admin/controllers/admin.controller';

$(document).ready(function() {
    $('#example').DataTable( {
        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   0
        } ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        },
        order: [[ 1, 'asc' ]]
    } );
} );


