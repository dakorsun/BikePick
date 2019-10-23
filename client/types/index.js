import { shape, number, string, arrayOf } from 'prop-types';

export const userType = shape({
    id: string.isRequired,
    email: string.isRequired,
});
