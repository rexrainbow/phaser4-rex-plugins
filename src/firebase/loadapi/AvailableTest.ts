import * as firebase from 'firebase/app';
import { APIUrlTyps } from './APIUrlTyps';
import { Delay } from '../../utils/promise/Delay';

export function AvailableTestPromise(
    config: APIUrlTyps
): Promise<void> {

    if (AvailableTest(config)) {
        return Promise.resolve();
    }

    // console.log('tset again')
    return Delay(10)
        .then(function () {
            return AvailableTestPromise(config);
        });
}

function AvailableTest(
    config: APIUrlTyps
): boolean {

    for (let k in config) {
        if (!config[k]) {
            continue;
        }

        if (window['firebase'][k] === undefined) {
            return false;
        }
    }
    return true;
}