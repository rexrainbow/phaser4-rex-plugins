export function TableRemoveKey0Event(name: string) {
    return `tables.${name}.removekey0`;
}

export type TableRemoveKey0EventHandler = (key0: string) => void;