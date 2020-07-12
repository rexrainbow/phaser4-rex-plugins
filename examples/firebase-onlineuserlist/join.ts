import * as firebase from 'firebase/app';
import 'firebase/database';
import { Firebase as rexFire } from '../../src';
import { GetRandomWord } from '../../src/utils/string/GetRandomWord';

firebase.initializeApp({
    apiKey: 'AIzaSyAN_ejscIWn3z6XpOhhl2Okh_MuEXq4nSQ',
    authDomain: 'my-3x-test.firebaseapp.com',
    databaseURL: 'https://my-3x-test.firebaseio.com',
    projectId: 'my-3x-test',
    storageBucket: 'my-3x-test.appspot.com',
    messagingSenderId: '322598340064'
});

let userList = new rexFire.OnlineUserList({
    root: 'online-userlist',
    maxUsers: 2
});

userList
    .setUser(GetRandomWord(10), GetRandomWord(5))
    .on('join', function (user) {
        console.log('Join:', user)
    })
    .on('change', function (user, prev) {
        console.log('Change:', user, prev)
    })
    .join()
    .then(function () {
        userList.startUpdate(); // Don't startUpdate before addUser
        return userList.changeUserName('rex')
    })
    .catch(function (error) {
        debugger
    })