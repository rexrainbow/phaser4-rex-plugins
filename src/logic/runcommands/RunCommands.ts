import { IRunCommandsConfig } from './IRunCommands';
import { RunCommand } from './RunCommand';

/**
 * Invoke callbacks from command queue.
 *
 * @export
 * @param {any[]} queue Commands queue, a single array `[fnName, ...param]` for a callback, or an array of callbacks.
 * @param {object} scope
 * @param {IRunCommandsConfig} [config={}]
 * @returns {*}
 */
export let RunCommands = function (
    queue: any[],
    scope: object,
    {
        reverse = false
    }: IRunCommandsConfig = {}
): any {

    let config = arguments[2];
    let retVal: any;
    if (Array.isArray(queue[0])) {

        if (!reverse) {
            for (let i = 0, cnt = queue.length; i < cnt; i++) {
                retVal = RunCommands(queue[i], scope, config);
            }
        } else {
            for (let cnt = queue.length, i = cnt - 1; i >= 0; i--) {
                retVal = RunCommands(queue[i], scope, config);
            }
        }
    } else {
        retVal = RunCommand(queue as [], scope, config);
    }

    return retVal;
}