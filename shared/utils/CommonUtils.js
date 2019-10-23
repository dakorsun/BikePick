import _upperCase from 'lodash/upperCase';
import _startCase from 'lodash/startCase';
import _lowerCase from 'lodash/lowerCase';
import _isString from 'lodash/isString';

/**
 * Can be used for checking categories names,
 * for example, isNameEqual('Premier League', 'premier-league') => true
 * @param value {String}
 * @param other {String}
 * @return {Boolean}
 */
export function isNameEqual(value, other) {
    if (_isString(value) && _isString(other)) {
        return value.toLowerCase().replace(/\s+/g, '-') === other.toLowerCase().replace(/\s+/g, '-');
    }
    return false;
}

/**
 * Convert sport name. For example convertSportName('ice-hockey') => 'ICE_HOCKEY'
 * @param name {String}
 * @return {String}
 */
export function convertSportName(name) {
    return _upperCase(name).replace(/\s+/g, '_');
}

/**
 * Convert sport name. For example convertSportName('Premier League') => 'premier-league'
 * @param value {String}
 * @return {String}
 */
export function convertToLinkPath(value) {
    if (_isString(value)) {
        return value.toLowerCase().replace(/\s+|_/g, '-');
    }
    return '';
}

/**
 * Convert string value. For example prettifyName('ice hockey') => 'Ice Hockey'
 * @param name {String}
 * @return {String}
 */
export function prettifyName(name) {
    return _startCase(_lowerCase(name));
}