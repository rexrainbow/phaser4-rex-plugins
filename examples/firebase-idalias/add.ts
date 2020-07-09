import * as firebase from 'firebase/app';
import { Firebase as rexFire } from '../../src'

firebase.initializeApp({
    apiKey: 'AIzaSyAN_ejscIWn3z6XpOhhl2Okh_MuEXq4nSQ',
    authDomain: 'my-3x-test.firebaseapp.com',
    databaseURL: 'https://my-3x-test.firebaseio.com',
    projectId: 'my-3x-test',
    storageBucket: 'my-3x-test.appspot.com',
    messagingSenderId: '322598340064'
});

let idAlias = new rexFire.IdAlias({
    root: 'idalias-test'
})

idAlias
    .add('aabb', 'rex')
    .then(function (result) {
        console.log('Add: ', result);
        return idAlias.getId('rex');
    })
    .then(function (result) {
        console.log('Get: ', result);
        return idAlias.getRandomAlias('ccdd', { digits: 10, candidates: '0123456789' });
    })
    .then(function (result) {
        console.log('Get: ', result);
    })