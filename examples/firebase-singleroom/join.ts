import * as firebase from 'firebase/app';
import 'firebase/database';
import { Firebase as rexFire } from '../../src';
import { GetRandomWord } from '../../src/utils/string/GetRandomWord';
import { Delay } from '../../src/utils/promise/Delay';
import { Clone } from '../../src/utils/object/Clone';

firebase.initializeApp({
    apiKey: 'AIzaSyAN_ejscIWn3z6XpOhhl2Okh_MuEXq4nSQ',
    authDomain: 'my-3x-test.firebaseapp.com',
    databaseURL: 'https://my-3x-test.firebaseio.com',
    projectId: 'my-3x-test',
    storageBucket: 'my-3x-test.appspot.com',
    messagingSenderId: '322598340064'
});

for (var i = 0; i < 2; i++) {
    JoinRoom()
}

function CreateRoomInstance() {
    const room = new rexFire.SingleRoom({
        root: 'test-single-room'
    });
    room.setUser(GetRandomWord(5), '');

    room
        .on('userlist.join', function (userInfo) {
            console.log(`${room.userID}: User ${userInfo.userID} join`, Clone(room.getUserList()))
        })
        .on('userlist.leave', function (userInfo) {
            console.log(`${room.userID}: User ${userInfo.userID} leave`)
        })
        .on('broadcast.receive', function (message) {
            console.log(`${room.userID}: Receive message '${message.message}' sent from ${message.senderID}`)
        })
    return room;
}

function JoinRoom() {
    const room = CreateRoomInstance();
    return room
        .joinRoom()
        .then(function () {
            return Delay(300)
        })
        .then(function () {
            return room.broadcast.send('Hello world');
        })
}