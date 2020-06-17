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
export function RunCommands(
    queue: any[],
    scope: object,
    config: IRunCommandsConfig = {}
): any {

    let retVal: any;
    if (Array.isArray(queue[0])) {
        let reverse: boolean;
        ({ reverse = false } = config);

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