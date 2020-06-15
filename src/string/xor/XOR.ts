import Encrypt from './Encrypt';
import Decrypt from './Decrypt';

let XOR = {
    /**
     * Encrypt source string with password via XOR algorithm
     *
     * @param {string} src Source string
     * @param {string} pwd Password
     * @returns {(string | null)} Encrypted result
     */
    encrypt(src: string, pwd: string): string | null {
        return Encrypt(src, pwd);
    },

    /**
     * Decrypt result string with password via XOR algorithm
     *
     * @param {string} data Encrypted result
     * @param {string} pwd Password
     * @returns {(string | null)} Source string
     */
    decrypt(data: string, pwd: string): string | null {
        return Decrypt(data, pwd);
    }
}

export { XOR };