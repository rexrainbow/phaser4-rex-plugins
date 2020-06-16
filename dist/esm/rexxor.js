let XOREncrypt = function (str, pwd) {
    if (pwd == null || pwd.length <= 0) {
        return null;
    }

    let prand = "";
    for (let i = 0; i < pwd.length; i++) {
        prand += pwd.charCodeAt(i).toString();
    }
    let spos = Math.floor(prand.length / 5);
    let mult = parseInt(prand.charAt(spos) + prand.charAt(spos * 2) + prand.charAt(spos * 3) + prand.charAt(spos * 4) + prand.charAt(spos * 5));
    let incr = Math.ceil(pwd.length / 2);
    let modu = Math.pow(2, 31) - 1;
    if (mult < 2) {
        return null;
    }
    let salt = Math.round(Math.random() * 1000000000) % 100000000;
    prand += salt;
    while (prand.length > 10) {
        prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
    }
    prand = (mult * prand + incr) % modu;
    let enc_chr = "";
    let enc_str = "";
    for (let i = 0; i < str.length; i++) {
        enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
        if (enc_chr < 16) {
            enc_str += "0" + enc_chr.toString(16);
        } else {
            enc_str += enc_chr.toString(16);
        }
        prand = (mult * prand + incr) % modu;
    }
    salt = salt.toString(16);
    while (salt.length < 8) {
        salt = 0 + salt;
    }
    enc_str += salt;
    return enc_str;
};

function Encrypt(src, pwd) {
    src = escape(src);
    pwd = escape(pwd.toString());
    return XOREncrypt(src, pwd);
}

let XORDecrypt = function (str, pwd) {
    if (str == null || str.length < 8) {
        return null;
    }
    if (pwd == null || pwd.length <= 0) {
        return null;
    }

    let prand = "";
    for (let i = 0; i < pwd.length; i++) {
        prand += pwd.charCodeAt(i).toString();
    }
    let spos = Math.floor(prand.length / 5);
    let mult = parseInt(prand.charAt(spos) + prand.charAt(spos * 2) + prand.charAt(spos * 3) + prand.charAt(spos * 4) + prand.charAt(spos * 5));
    let incr = Math.round(pwd.length / 2);
    let modu = Math.pow(2, 31) - 1;
    let salt = parseInt(str.substring(str.length - 8, str.length), 16);
    str = str.substring(0, str.length - 8);
    prand += salt;
    while (prand.length > 10) {
        prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
    }
    prand = (mult * prand + incr) % modu;
    let enc_chr = "";
    let enc_str = "";
    for (let i = 0; i < str.length; i += 2) {
        enc_chr = parseInt(parseInt(str.substring(i, i + 2), 16) ^ Math.floor((prand / modu) * 255));
        enc_str += String.fromCharCode(enc_chr);
        prand = (mult * prand + incr) % modu;
    }
    return enc_str;
};

function Decrypt(data, pwd) {
    pwd = escape(pwd.toString());
    let result = XORDecrypt(data, pwd);
    if (result != null) {
        result = unescape(result);
    }
    return result;
}

let XOR = {
    encrypt(src, pwd) {
        return Encrypt(src, pwd);
    },
    decrypt(data, pwd) {
        return Decrypt(data, pwd);
    }
};

export { XOR };
