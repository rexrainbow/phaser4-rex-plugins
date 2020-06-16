(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.rexruncommands = {}));
}(this, (function (exports) { 'use strict';

    let FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
    /**
     * Convert string to string, number, boolean value, or null(from empty string).
     *
     * @param {string} s Source string.
     * @returns {(string | number | boolean | null)} String, number, boolean value, or null(from empty string).
     */
    function Convert(s) {
        let result;
        if (s === '') {
            result = null;
        }
        else if (FLOAT.test(s)) {
            result = parseFloat(s);
        }
        else {
            if (s === 'false') {
                result = false;
            }
            else if (s === 'true') {
                result = true;
            }
            else {
                result = s;
            }
        }
        return result;
    }

    /**
     * Retrieves a value from an object.
     *
     * @param {*} source
     * @param {string} key
     * @param {*} defaultValue
     * @returns
     */
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
            //  Use for loop here so we can break early
            for (let i = 0, cnt = keys.length; i < cnt; i++) {
                if (parent.hasOwnProperty(keys[i])) {
                    //  Yes it has a key property, let's carry on down
                    value = parent[keys[i]];
                    parent = parent[keys[i]];
                }
                else {
                    //  Can't go any further, so reset to default
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

    function RunCommand(cmd, scope, config) {
        let argsConvert, argsConvertScope;
        ({
            argsConvert = false,
            argsConvertScope = undefined
        } = config || {});
        let fnName, fnArgs;
        ([fnName, ...fnArgs] = cmd);
        if (argsConvert) {
            // Convert string to number, boolean, null, or string        
            if (argsConvert === true) { // Use default type convert callback
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

    /**
     * Run callbacks from command queue.
     *
     * @param {(any[] | [any[]])} queue Commands queue, a single array `[fnName, ...param]` for a callback, or an array of callbacks.
     * @param {object} scope
     * @param {IRunCommandsConfig} [config] Configuration.
     * @returns {*}
     */
    function RunCommands(queue, scope, config) {
        if (config === undefined) {
            config = {};
        }
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

    exports.RunCommands = RunCommands;

})));
//# sourceMappingURL=rexruncommands.js.map
