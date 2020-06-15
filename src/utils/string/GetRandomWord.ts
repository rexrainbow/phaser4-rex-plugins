import RandomInt from '../math/RandomInt';
import RandomItem from '../array/GetRandom';

const CANDIDATES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Get a string composed of random picked characters from candidates.
 *
 * @param {number} min Minimum string length.
 * @param {(number | undefined)} [max] 
 * @param {string} [candidates=CANDIDATES]
 * @returns
 */
export default function GetRandomWord(
    min: number,
    max?: number | undefined,
    candidates: string = CANDIDATES
) {

    let count = (max === undefined) ? min : RandomInt(min, max);
    let word = '';
    for (let i = 0; i < count; i++) {
        word += RandomItem(candidates);
    }
    return word;
}
