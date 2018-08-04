import { getFlaggedQuestionService } from '../services/admin.service';
import {layout} from '../views/admin.view';
const flagged = document.getElementById('flagged');
flagged.addEventListener('click', (event) => {
  event.preventDefault();
  layout();
  getFlaggedQuestionService();
});
layout();
getFlaggedQuestionService();