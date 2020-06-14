/**
 * Pick mode, put item back to box or not.
 *
 * @export
 * @enum {number}
 */
export enum Mode {
    /**
     * Don't put item back to box after pick it.
     */
    shuffle,

    /**
     * Put item back to box after pick it.
     */
    random
}

export type ModeString = 'shuffle' | 'random';

export type RNDObjType = {
    frac: () => number
}

/**
 * Configuration of Gashapon class.
 *
 * @export
 * @interface IConfig
 */
export interface IConfig {

    /**
     * Pick mode, put item back to box or not.
     *
     * @type {Mode}
     * @memberof IConfig
     */
    mode?: Mode | ModeString;

    /**
     * Reload candidate items when box is empty.
     *
     * @type {boolean}
     * @memberof IConfig
     */
    reload?: boolean;

    /**
     * Candidate items.
     *
     * @type {{ [name: string]: number }}
     * @memberof IConfig
     */
    items?: { [name: string]: number };

    /**
     * Custom random number generator, optional.
     *
     * @type {RNDObjType}
     * @memberof IConfig
     */
    rnd?: RNDObjType;

    result?: string | null;

    remainder?: { [name: string]: number };
}