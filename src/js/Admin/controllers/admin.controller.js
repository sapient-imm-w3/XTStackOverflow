import { getFlaggedQuestionService } from '../services/admin.service';

const flagged = document.getElementById('flagged');
flagged.addEventListener('click', (event) => {
  event.preventDefault();
  getFlaggedQuestionService();
});

getFlaggedQuestionService();
