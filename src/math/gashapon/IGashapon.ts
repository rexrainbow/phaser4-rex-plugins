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

export type ItemType = { [name: string]: number };

export type RNDObjType = {
    frac: () => number
}

/**
 * Config of constructor.
 *
 * @export
 * @interface IConfig
 */
export interface IConfig {

    /**
     * Pick mode, put item back to box or not.
     *
     * @type {Mode}
     * @memberof IState
     */
    mode?: Mode | ModeString;

    /**
     * Reload candidate items when box is empty.
     *
     * @type {boolean}
     * @memberof IState
     */
    reload?: boolean;

    /**
     * Candidate items.
     *
     * @type {ItemType}
     * @memberof IState
     */
    items?: ItemType;

    /**
     * Custom random number generator, optional.
     *
     * @type {RNDObjType}
     * @memberof IState
     */
    rnd?: RNDObjType;
}

/**
 * State of Gashapon instance.
 *
 * @export
 * @interface IState
 */
export interface IState {
    mode?: Mode | ModeString;
    reload?: boolean;
    items?: ItemType;
    rnd?: RNDObjType;
    result?: string | null;
    remainder?: ItemType;
}

export interface IGashapon {
    mode: Mode;
    items: ItemType;
    remainder: ItemType;
    reload: boolean;
    rnd: RNDObjType | undefined;
    result: string | null;
}