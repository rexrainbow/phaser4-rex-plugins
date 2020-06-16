let FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
function Convert(s) {
    let result;
    if (s === '') {
        result = null;
    }
    else if (FLOAT.test(s)) {
        result = parseFloat(s);
    }
    else {
        if (s === 'false') {
            result = false;
        }
        else if (s === 'true') {
            result = true;
        }
        else {
            result = s;
        }
    }
    return result;
}

export { Convert as C };
