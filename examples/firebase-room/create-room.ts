import * as firebase from 'firebase/app';
import 'firebase/database';
import { Firebase as rexFire } from '../../src';
import { GetRandomWord } from '../../src/utils/string/GetRandomWord';
import { Delay } from '../../src/utils/promise/Delay';
import { Clone } from '../../src/utils/object/Clone';


const CreateRoomInstance = function () {
    const room = new rexFire.Room({
        root: 'test-room'
    })
        .setUser(GetRandomWord(5), '')

    room
        .on('userlist.join', function (userInfo) {
            console.log(`${room.userID}: User ${userInfo.userID} join room ${room.roomID}`, Clone(room.getUserList()))
        })
        .on('userlist.leave', function (userInfo) {
            console.log(`${room.userID}: User ${userInfo.userID} leave room ${room.roomID}`)
        })
    return room;
}

const CreateRoom = function () {
    // Simulate an user creates a random room
    const room = CreateRoomInstance()
    const userID = room.userInfo.userID;

    return room
        .createRoom({
            roomName: 'chat',
            roomType: 'private',
            maxUsers: 2
        })
        .then(function (roomInfo) {
            console.log(`${userID}: Create room ${roomInfo.roomID}`)
            return Promise.resolve(roomInfo)
        });
}

const JoinRoom = function (roomID) {
    // Simulate an user joins a room via roomId
    const room = CreateRoomInstance()
    const userID = room.userID;

    // Leave room after 1000ms
    setTimeout(function () {
        const prevRoomID = room.roomID;
        room
            .leaveRoom()
            .then(function () {
                return room.getUserList(prevRoomID)
            })
            .then(function (users) {
                console.log(`Room ${prevRoomID} has users:`, users);
                return Delay(1000)

            })
            .then(function () {
                return room.joinRandomRoom({ roomType: 'private' })
            })
            .catch(function () {
                debugger
            })

    }, 1000)

    return room
        .joinRoom({
            roomID: roomID
        })
        .then(function (roomInfo) {
            console.log(`${userID}: Join room ${roomInfo.roomID}`)
            return Promise.resolve(roomInfo);
        })
}

firebase.initializeApp({
    apiKey: 'AIzaSyAN_ejscIWn3z6XpOhhl2Okh_MuEXq4nSQ',
    authDomain: 'my-3x-test.firebaseapp.com',
    databaseURL: 'https://my-3x-test.firebaseio.com',
    projectId: 'my-3x-test',
    storageBucket: 'my-3x-test.appspot.com',
    messagingSenderId: '322598340064'
});

CreateRoom()
    .then(function (roomInfo) {
        return Delay(1000, roomInfo)
    })
    .then(function (roomInfo) {
        return JoinRoom.call(self, roomInfo.roomID)
    })