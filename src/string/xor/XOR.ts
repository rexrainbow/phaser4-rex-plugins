import Encrypt from './Encrypt';
import Decrypt from './Decrypt';

let XOR = {
    /**
     * Encrypt source with password via XOR algorithm
     *
     * @param {string} src Source string
     * @param {string} pwd Password
     * @returns {(string | null)} Encrypted result
     */
    encrypt: function (src: string, pwd: string): string | null {
        src = escape(src);
        pwd = escape(pwd.toString());
        return Encrypt(src, pwd);
    },

    /**
     * Decrypt result with password via XOR algorithm
     *
     * @param {string} data Encrypted result
     * @param {string} pwd Password
     * @returns {(string | null)} Source string
     */
    decrypt: function (data: string, pwd: string): string | null {
        pwd = escape(pwd.toString());
        let result = Decrypt(data, pwd);
        if (result != null) {
            result = unescape(result)
        }
        return result;
    }
}

export default XOR;