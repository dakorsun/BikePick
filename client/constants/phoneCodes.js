import countryTelData from 'country-telephone-data';
import _uniq from 'lodash/uniq';
import _map from 'lodash/map';

export default _uniq(_map(countryTelData.allCountries, c => c.dialCode)).sort((c1, c2) => c1 - c2);
