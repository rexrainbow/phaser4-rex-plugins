export type ArgConvertCallbackType = (s: any, cmd?: any[]) => any;

export interface IRunCommandConfig {
    /**
     * Callback to convert string to string, number, boolean, null, or other kinds of value.
     *
     * @type {(ArgConvertCallbackType | boolean)} Callback to convert string, or set `true` use default convert callback.
     * @memberof IRunCommandConfig
     */
    argsConvert?: ArgConvertCallbackType | boolean;

    /**
     * Scope of converting string callback
     *
     * @type {object}
     * @memberof IRunCommandConfig
     */
    argsConvertScope?: object
}

export interface IRunCommandsConfig extends IRunCommandConfig {
    /**
     * Run commands from first item to last, or from last to first?
     *
     * @type {boolean}
     * @memberof IRunCommandsConfig
     */
    reverse?: boolean
}