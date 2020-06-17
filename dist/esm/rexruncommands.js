import { C as Convert } from './TypeConvert-f203b481.js';

function GetValue(source, key, defaultValue) {
    if (!source || typeof source !== 'object') {
        return defaultValue;
    }
    else if (source.hasOwnProperty(key)) {
        return source[key];
    }
    else if (key.indexOf('.') !== -1) {
        let keys = key.split('.');
        let parent = source;
        let value = defaultValue;
        for (let i = 0, cnt = keys.length; i < cnt; i++) {
            if (parent.hasOwnProperty(keys[i])) {
                value = parent[keys[i]];
                parent = parent[keys[i]];
            }
            else {
                value = defaultValue;
                break;
            }
        }
        return value;
    }
    else {
        return defaultValue;
    }
}

function RunCommand(cmd, scope, config = {}) {
    let argsConvert, argsConvertScope;
    ({
        argsConvert = false,
        argsConvertScope = undefined
    } = config);
    let fnName, fnArgs;
    ([fnName, ...fnArgs] = cmd);
    if (argsConvert) {
        if (argsConvert === true) {
            argsConvert = Convert;
            argsConvertScope = undefined;
        }
        for (let i = 0, cnt = fnArgs.length; i < cnt; i++) {
            if (argsConvertScope) {
                fnArgs[i] = argsConvert.call(argsConvertScope, fnArgs[i], cmd);
            }
            else {
                fnArgs[i] = argsConvert(fnArgs[i], cmd);
            }
        }
    }
    let fn;
    if (typeof (fnName) === 'string') {
        fn = scope[fnName];
        if (fn == null) {
            fn = GetValue(scope, fnName, null);
        }
    }
    else {
        fn = fnName;
    }
    let retValue = fn.apply(scope, fnArgs);
    return retValue;
}

function RunCommands(queue, scope, config = {}) {
    let retVal;
    if (Array.isArray(queue[0])) {
        let reverse;
        ({ reverse = false } = config);
        if (!reverse) {
            for (let i = 0, cnt = queue.length; i < cnt; i++) {
                retVal = RunCommands(queue[i], scope, config);
            }
        }
        else {
            for (let cnt = queue.length, i = cnt - 1; i >= 0; i--) {
                retVal = RunCommands(queue[i], scope, config);
            }
        }
    }
    else {
        retVal = RunCommand(queue, scope, config);
    }
    return retVal;
}

export { RunCommands };
