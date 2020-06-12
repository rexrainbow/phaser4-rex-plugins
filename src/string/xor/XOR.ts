import Encrypt from './Encrypt';
import Decrypt from './Decrypt';

/**
 * Encrypt or Decrypt source string via XOR algorithm
 *
 * @class XOR
 */
class XOR {
    /**
     * Encrypt source string with password via XOR algorithm
     *
     * @static
     * @param {string} src Source string
     * @param {string} pwd Password
     * @returns {(string | null)} Encrypted result
     * @memberof XOR
     */
    static encrypt(src: string, pwd: string): string | null {
        src = escape(src);
        pwd = escape(pwd.toString());
        return Encrypt(src, pwd);
    }

    /**
     * Decrypt result string with password via XOR algorithm
     *
     * @static
     * @param {string} data Encrypted result
     * @param {string} pwd Password
     * @returns {(string | null)} Source string
     * @memberof XOR
     */
    static decrypt(data: string, pwd: string): string | null {
        pwd = escape(pwd.toString());
        let result = Decrypt(data, pwd);
        if (result != null) {
            result = unescape(result)
        }
        return result;
    }
}

export default XOR;