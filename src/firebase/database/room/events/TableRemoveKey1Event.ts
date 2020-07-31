export function TableRemoveKey1Event(name: string) {
    return `tables.${name}.removekey1`;
}

export type TableRemoveKey1EventHandler = (key0: string, key1: string) => void;