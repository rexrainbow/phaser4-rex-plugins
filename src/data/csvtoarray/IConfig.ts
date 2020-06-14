export interface IConfig {
    /**
     * Delimiter of csv-string. Default value is ','.
     *
     * @type {string}
     * @memberof IConfig
     */
    delimiter?: string;

    /**
     * Set true to convert string to string, number, boolean, or null value.
     *
     * @type {boolean}
     * @memberof IConfig
     */
    convert?: boolean;
};