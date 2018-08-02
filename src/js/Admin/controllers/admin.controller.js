import { createFlaggedDiv } from '../views/admin.view';

const users = document.getElementById('users');
users.addEventListener('click', (event) => {
  event.preventDefault();
  createFlaggedDiv();
});