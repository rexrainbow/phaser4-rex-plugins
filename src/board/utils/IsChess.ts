export function IsChess(obj) {
    if (typeof (obj) === 'object') {
        return obj.hasOwnProperty('rexChess');
    } else {
        return false;
    }
}