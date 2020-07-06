export let Delay = function (
    s: number = 0,
    result?: any)
    : Promise<any> {

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(result)
        }, s);
    });
};