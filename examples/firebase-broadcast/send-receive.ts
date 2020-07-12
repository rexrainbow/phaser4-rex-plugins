import * as firebase from 'firebase/app';
import 'firebase/database';
import { Firebase as rexFire } from '../../src';


firebase.initializeApp({
    apiKey: 'AIzaSyAN_ejscIWn3z6XpOhhl2Okh_MuEXq4nSQ',
    authDomain: 'my-3x-test.firebaseapp.com',
    databaseURL: 'https://my-3x-test.firebaseio.com',
    projectId: 'my-3x-test',
    storageBucket: 'my-3x-test.appspot.com',
    messagingSenderId: '322598340064'
});

let messager = new rexFire.Broadcast({
    root: 'broadcast-test',
    senderID: 'aabb',
    senderName: 'rex',
    receiverID: 'aabb'
});

messager
    .on('receive', function (d) {
        console.log(`${d.senderName}: ${d.message}`);
    })
    .send('1')  // This message won't be received
    .then(function () {
        return messager.send('2');
        // This message won't be received
    })
    .then(function () {
        return messager.send('3');
        // This message won't be received
    })
    .then(function () {
        messager.startReceiving();
        return Promise.resolve();
    })
    .then(function () {
        return messager.send('hello');
    })
    .then(function () {
        return messager.send('hello');
    })
    .then(function () {
        return messager.send('world');
    })
    .catch(function (error) {
        console.log(error);
    });