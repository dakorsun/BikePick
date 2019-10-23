import { getI18n } from 'react-i18next';

/**
 * @typedef {{t: function}}
 */
export default (process && process.release)
    ? getI18n()
    : require('./client').default;
