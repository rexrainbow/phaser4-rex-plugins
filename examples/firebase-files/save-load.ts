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

let fileManager = new rexFire.Files({
    root: 'files-test'
})

fileManager
    .setOwner('rex')
    .loadHeaders()
    .then(function (result) {
        console.log('Load headers', result.headers);
        return fileManager.save('slot1', { description: 'aabb' }, { a: 10, b: 20 });
    })
    .then(function (result) {
        return fileManager.load(result.fileID);
    })
    .then(function (result) {
        console.log('Load file:', result.fileID, result.header, result.content);

        return fileManager.save('slot2', { description: 'ccdd' }, { c: 10, d: 20 });
    })
    .then(function () {
        return fileManager.loadHeaders();
    })
    .then(function (result) {
        console.log('Load headers', result.headers);
    })
    .catch(function (result) {
        console.log('Error', result.error);
    })