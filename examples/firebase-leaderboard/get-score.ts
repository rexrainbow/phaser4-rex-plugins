import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Firebase as rexFire } from '../../src';

firebase.initializeApp({
    apiKey: 'AIzaSyAN_ejscIWn3z6XpOhhl2Okh_MuEXq4nSQ',
    authDomain: 'my-3x-test.firebaseapp.com',
    databaseURL: 'https://my-3x-test.firebaseio.com',
    projectId: 'my-3x-test',
    storageBucket: 'my-3x-test.appspot.com',
    messagingSenderId: '322598340064'
});

let leaderBoard = new rexFire.LeaderBoard({
    root: 'leaderboard-test',
    // timeFilters: true,
    pageItemCount: 3
})

var promises = [];
for (var i = 0; i < 10; i++) {
    promises.push(
        leaderBoard.setUser(`${i}`).post(i)
    );
}
Promise.all(promises)
    .then(function () {
        return leaderBoard.setUser('3').getScore();
    })
    .then(function (result) {
        console.log('Get score:', result);
        return leaderBoard.getRank();
    })
    .then(function (result) {
        console.log('Get rank:', result);
    })
    .catch(function (error) {
        debugger;
    })