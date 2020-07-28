export function TableRemoveKey2Event(name) {
    return `tables.${name}.removekey2`;
}

export type TableRemoveKey2EventHandler = (key0: string, key1: string, key2: string) => void;