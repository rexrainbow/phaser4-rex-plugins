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

var table = new rexFire.ItemTable({
    root: 'itemtable-test'
})

table
    .on('addkey2', function (key0, key1, key2, value) {
        console.log(`${key0}.${key1}.${key2} = ${value}`);
    })
    .on('changekey2', function (key0, key1, key2, value) {
        console.log(`${key0}.${key1}.${key2} = ${value}`);
    })
    .startUpdate()
    .removeDataOnDisconnect('p0')
    .then(function () {
        return table.setData('p0', 'r0', 'c0', 123);
    })
    .then(function () {
        console.log(table.cloneData())
        return table.incValue('p0', 'r0', 'c0', 100);
    })
    .then(function () {
        console.log(table.cloneData())
    })
