import { IRunCommandConfig, ArgConvertCallbackType } from './IRunCommands';
import DefaultTypeConvert from '../../utils/string/TypeConvert';
import GetValue from '../../utils/object/GetValue';

/**
 * Invoke a callback.
 *
 * @export
 * @param {any[]} cmd
 * @param {object} scope
 * @param {IRunCommandConfig} [config={}]
 * @returns {*}
 */
export function RunCommand(
    cmd: any[],
    scope: object,
    {
        argsConvert = false,
        argsConvertScope = undefined
    }: IRunCommandConfig = {}
): any {

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

    let retValue = fn.apply(scope, fnArgs as []);
    return retValue;
}