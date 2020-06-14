import { IRunCommandConfig, IRunCommandsConfig, ArgConvertCallbackType } from './IConfig';
import DefaultTypeConvert from '../../utils/string/TypeConvert';
import GetValue from '../../utils/object/GetValue';

/**
 * Run callbacks from command queue.
 *
 * @param {(any[] | [any[]])} queue Commands queue, a single array `[fnName, ...param]` for a callback, or an array of callbacks.
 * @param {object} scope Scope of callbacks.
 * @param {IRunCommandsConfig} [config] Configuration.
 * @returns {*}
 */
let RunCommands = function (
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

let RunCommand = function (
    cmd: any[],
    scope: object,
    config?: IRunCommandConfig
): any {

    let argsConvert: ArgConvertCallbackType | boolean,
        argsConvertScope: object | undefined;
    ({ argsConvert = false, argsConvertScope = undefined } = config);

    let fnName: string,
        fnArgs: any[];
    ([fnName, ...fnArgs] = cmd);

    if (argsConvert) {
        // Convert string to number, boolean, null, or string        
        if (argsConvert === true) { // Use default type convert callback
            argsConvert = DefaultTypeConvert;
            argsConvertScope = undefined;
        }
        for (let i = 0, cnt = fnArgs.length; i < cnt; i++) {
            if (argsConvertScope) {
                fnArgs[i] = argsConvert.call(argsConvertScope, fnArgs[i], cmd);
            } else {
                fnArgs[i] = argsConvert(fnArgs[i], cmd);
            }
        }
    }

    let fn: () => any;
    if (typeof (fnName) === 'string') {
        fn = scope[fnName];
        if (fn == null) {
            fn = GetValue(scope, fnName, null);
        }
    } else {
        fn = fnName;
    }

    let retValue = fn.apply(scope, fnArgs);
    return retValue;
}

export { RunCommands, IRunCommandsConfig };