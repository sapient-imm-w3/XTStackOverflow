import { displayFavCategories } from './view';
import { database, auth } from './controller';
import triggerTrending from './Trending/controller';
import triggerMyQuestions from './MyQuestions/controller';
import triggerRecommended from './Recommended/controller';

export function getFavCategories() {
    const db = database.ref(`categories`);
    db.on('value', (data) => {
        displayFavCategories(data);
    });
}

export function updateCategories(favourite) {
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
export function getUser(user) {
    let flag = 0;
    //const db = database.ref(`users/` + user.uid);
    const db = database.ref(`users`);
    db.once('value', (data) => {
        data.forEach((userOne) => {
            if (user.uid === userOne.key) {
                flag = 1;
                if(userOne.child(`role`).val()==="normal"){
                triggerTrending();
                triggerMyQuestions(user);
                triggerRecommended(user);
                }else if(userOne.child(`role`).val()==="admin"){
                    console.log("Admin Page"); // Redirect to Srikar's Module
                }
            }
        })
        flagger(flag);
    });

}

function flagger(flag) {
    if (flag === 0) {
        console.log("flag " + flag);
        getFavCategories();
    }
}