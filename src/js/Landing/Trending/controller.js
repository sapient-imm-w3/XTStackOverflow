import {viewLayout} from './views';
import { getAnswerCountFromDB } from './service';

export default () => {
    viewLayout();
    getAnswerCountFromDB();
};
