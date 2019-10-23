import _forEach from 'lodash/forEach';
import crypto from 'crypto';

export function parseErrors(error) {
    const result = {};
    _forEach(error, (val, key) => {
        result[key] = val.message;
    });
    return result;
}

export function parseSequelizeErrors(error) {
    const result = {};
    _forEach(error, (val, key) => {
        result[val.path] = val.message;
    });
    return result;
}

const characterPool = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()+_-=}{[]|:;"/?.><,`~',
};

export function randomNumber(max) {
    // gives a number between 0 (inclusive) and max (exclusive)
    return crypto.randomBytes(1)[0] % max;
}

/**
 * @param {Number} length
 * @param {Object} options
 * @param {Boolean} options.lowercase
 * @param {Boolean} options.uppercase
 * @param {Boolean} options.numbers
 * @param {Boolean} options.symbols
 * @return {string}
 */
export function generateRandomString(length, options) {
    const passwordArray = [];
    const numberOfSections = Object.keys(options).reduce((a, i) => a + options[i], 0);
    const numberInSection = Number(Math.max(length / numberOfSections, 1));

    Object.keys(options).forEach(opt => {
        if (options[opt]) {
            for (let i = 0; i < numberInSection; i += 1) {
                const pool = characterPool[opt];
                passwordArray.push(pool[randomNumber(pool.length)]);
            }
        }
    });

    return passwordArray
        .sort(() => (Math.random() >= 0.5 ? 1 : -1))
        .join('')
        .substring(0, length);
}
