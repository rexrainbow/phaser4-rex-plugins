import * as firebase from 'firebase/app';
import 'firebase/database';
import { Firebase as rexFire } from '../../src';
import { GetRandomWord } from '../../src/utils/string/GetRandomWord';
import { Delay } from '../../src/utils/promise/Delay';
import { Clone } from '../../src/utils/object/Clone';


const CreateRoomInstance = function () {
    const room = new rexFire.Room({
        root: 'test-room',
        tables: [
            {
                // A 1d table named 'data'
                key: 'data',
                type: '1d'
            }
        ]
    })
        .setUser(GetRandomWord(5), '')

    room
        .on('userlist.join', function (userInfo) {
            console.log(`${room.userID}: User ${userInfo.userID} join room ${room.roomID}`, Clone(room.getUserList()))
        })
        .on('userlist.leave', function (userInfo) {
            console.log(`${room.userID}: User ${userInfo.userID} leave room ${room.roomID}`)
        })
        .on('broadcast.receive', function (message) {
            console.log(`${room.userID}: Receive message '${message.message}' sent from ${message.senderID}`)
        })
        .on('tables.data.init', function () {
            console.log(`${room.userID}: Tables.data init, `, room.getTable('data').cloneData())
        })
        .on('tables.data.update', function () {
            if (!room.getTable('data').initialFlag) {
                return;
            }
            console.log(`${room.userID}: Tables.data update, `, room.getTable('data').cloneData())
        })
    return room;
}

const CreateRandomRoom = function () {
    // Simulate an user creates a random room
    const room = CreateRoomInstance();
    const userID = room.userID;

    room
        .on('userlist.join', function (userInfo) {
            // Send welcom message later, user might not be initialized yet now
            setTimeout(function () {
                room.broadcast.send(`Hello ${userInfo.userID}`)
            }, 300)
        })

    return room
        .createRandomRoom({
            digits: 6,
            candidates: '0123456789',
            maxUsers: 2,

            filterData: { a: 10, b: 20 }
        })
        .then(function (roomConfig) {
            console.log(`${userID}: Create room ${roomConfig.roomID}`)
            // room.changeRoomName('aaabbb')
            // room.changeFilterData({ a: 30, b: 40 })
            room.getTable('data').setData('a', 10);
            room.getTable('data').setData('b', 20);
            return Promise.resolve(roomConfig)
        });
}

const JoinRoom = function (roomID) {
    // Simulate an user joins a room via roomId
    var room = CreateRoomInstance();
    var userID = room.userInfo.userID;

    // Leave room after 1000ms
    setTimeout(function () {
        var prevRoomID = room.roomID;
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
                return room.joinRandomRoom()
            })
    }, 1000)

    return room
        .joinRoom({
            roomID: roomID
        })
        .then(function (roomConfig) {
            console.log(`${userID}: Join room ${roomConfig.roomID}`)
            return Promise.resolve(roomConfig);
        })
}

var self = this;
CreateRandomRoom.call(self)
    .then(function (roomConfig) {
        return Delay(1000, roomConfig)
    })
    .then(function (roomConfig) {
        return JoinRoom.call(self, roomConfig.roomID)
    })