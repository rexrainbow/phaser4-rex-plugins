import { LoadScript } from './LoadScript';

export function LoadScriptPromise(
    url: string
): Promise<void> {

    return new Promise(function (resolve, reject) {
        LoadScript(url, resolve);
    });
};