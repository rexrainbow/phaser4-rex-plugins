export let GetKey = function (
    rowKey: string,
    colKey: string
): string {

    return `(${rowKey}][${colKey})`;
}