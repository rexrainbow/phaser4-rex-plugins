export function GetKey(
    rowKey: string,
    colKey: string
): string {

    return `(${rowKey}][${colKey})`;
}