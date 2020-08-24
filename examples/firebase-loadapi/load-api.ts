import { Firebase as rexFire } from '../../src';

rexFire.LoadAPI()
    .then(() => {
        window['firebase'].initializeApp({
            apiKey: 'AIzaSyAN_ejscIWn3z6XpOhhl2Okh_MuEXq4nSQ',
            authDomain: 'my-3x-test.firebaseapp.com',
            databaseURL: 'https://my-3x-test.firebaseio.com',
            projectId: 'my-3x-test',
            storageBucket: 'my-3x-test.appspot.com',
            messagingSenderId: '322598340064'
        })
        console.log(window['firebase'].database);
        console.log('Load API successful');
    })
    .catch(() => {
        console.log('Load API failed');
    })