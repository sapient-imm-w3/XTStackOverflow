import {displayFavCategories} from './view';
import {database,auth} from './controller';
import triggerTrending from './Trending/controller';
import triggerMyQuestions from './MyQuestions/controller';
import triggerRecommended from './Recommended/controller';

export function getFavCategories() {
    const db = database.ref(`categories`);
        db.on('value', (data) => {
            displayFavCategories(data);
        });
}

export function updateCategories(favourite){
    let user = auth.currentUser;
        database.ref(`users/` + user.uid).set({
            name: user.displayName,
            email: user.email,
            role: "normal",
            fav_categories: favourite
        });
    triggerTrending();
    triggerMyQuestions(user);
    triggerRecommended(user);
}