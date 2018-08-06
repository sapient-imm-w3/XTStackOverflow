import {viewLayout} from './view';
import { getQuestions } from './service';

export default (user) => {
    viewLayout();
    getQuestions(user);
}
