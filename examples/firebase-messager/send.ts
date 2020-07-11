import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Firebase as rexFire } from '../../src'

firebase.initializeApp({
    apiKey: 'AIzaSyAN_ejscIWn3z6XpOhhl2Okh_MuEXq4nSQ',
    authDomain: 'my-3x-test.firebaseapp.com',
    databaseURL: 'https://my-3x-test.firebaseio.com',
    projectId: 'my-3x-test',
    storageBucket: 'my-3x-test.appspot.com',
    messagingSenderId: '322598340064'
});

let messager = new rexFire.Messages({
    root: 'messages-test',
    senderID: 'aabb',
    senderName: 'rex'
})

messager
    .on('receive', function (d) {
        console.log(d);
        console.log(messager.cacheMessages);
    })
    .loadPreviousMessages()
    .then(function (messages) {
        console.log(messages);

        return messager
            .startReceiving()
            .send((new Date()).toString());
    })
    .then(function () {
        debugger
    })
    .catch(function (error) {
        debugger
    })