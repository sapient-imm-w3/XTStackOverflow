import {getRecommended} from './service';
import {viewLayout} from './view';

export default (user) => {
viewLayout();
getRecommended(user);
}