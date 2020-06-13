/**
 * String encoding type.
 *
 * @export
 * @enum {number}
 */
export enum EncodeType {
    none,
    base64,
    utf16,
    uri
};

export type EncodeTypeString = 'none' | 'base64' | 'utf16' | 'uri';

/**
 * Configuration of LZString class.
 *
 * @export
 * @interface IConfig
 */
export interface IConfig {
    /**
     * String encoding type.
     *
     * @type {EncodeType}
     * @memberof IConfig
     */
    encoding?: EncodeType | EncodeTypeString;
}