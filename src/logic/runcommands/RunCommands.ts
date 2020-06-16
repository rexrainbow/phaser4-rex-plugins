import { IRunCommandsConfig } from './IConfig';
import { RunCommand } from './RunCommand';

/**
 * Run callbacks from command queue.
 *
 * @param {(any[] | [any[]])} queue Commands queue, a single array `[fnName, ...param]` for a callback, or an array of callbacks.
 * @param {object} scope 
 * @param {IRunCommandsConfig} [config] Configuration.
 * @returns {*}
 */
export function RunCommands(
    queue: any[] | [any[]],
    scope: object,
    config?: IRunCommandsConfig
): any {

    if (config === undefined) {
        config = {};
    }

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