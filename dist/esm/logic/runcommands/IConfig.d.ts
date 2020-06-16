export declare type ArgConvertCallbackType = (s: any, cmd?: any[]) => any;
export interface IRunCommandConfig {
    argsConvert?: ArgConvertCallbackType | boolean;
    argsConvertScope?: object;
}
export interface IRunCommandsConfig extends IRunCommandConfig {
    reverse?: boolean;
}
//# sourceMappingURL=IConfig.d.ts.map