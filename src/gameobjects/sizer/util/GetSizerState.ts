export function GetSizerState(gameObject: any) {
    if (!gameObject.hasOwnProperty('rexSizer')) {
        gameObject.rexSizer = {};
    }
    return gameObject.rexSizer;
}