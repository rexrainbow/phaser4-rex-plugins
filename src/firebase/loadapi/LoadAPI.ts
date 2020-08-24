import { APIUrlTyps } from './APIUrlTyps';
import { GetDefaultUrl } from './GetDefaultUrl';
import { MergeRight } from '../../utils/object/MergeRight';
import { LoadScriptPromise } from '../../utils/loader/LoadScriptPromise';
import { AvailableTestPromise } from './AvailableTest';

const VERSION: string = '7.19.0';

export function LoadAPI(
    urlConfig: string | APIUrlTyps = VERSION
) {

    let apiUrl: APIUrlTyps;
    if (typeof (urlConfig) === 'string') {  // Get specific version
        apiUrl = GetDefaultUrl(urlConfig);
    } else { // Get default version
        apiUrl = MergeRight(GetDefaultUrl(VERSION), urlConfig);
    }

    return LoadScriptPromise(apiUrl.app)  // Load firebase-app
        .then(function (): Promise<void | void[]> { // Load other SDK
            const promises: Promise<void>[] = [];
            for (var k in apiUrl) {
                if (k === 'app') {
                    continue;
                }
                const url = apiUrl[k];
                if (!url) {
                    continue;
                }
                promises.push(LoadScriptPromise(url))
            }

            if (promises.length === 0) {
                return Promise.resolve();
            } else {
                return Promise.all(promises);
            }
        })
        .then(function () { // Wait until all vairalbe are available
            return AvailableTestPromise(apiUrl);
        })
}