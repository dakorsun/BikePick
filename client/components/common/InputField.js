import React from 'react';
import { string, boolean, object, shape } from 'prop-types';

export default function InputField({ input, name, id, label, placeholder, meta: { touched, error }, ...rest }) {
    return (
        <div className="form-field">
            <label htmlFor={id || name}>{label}</label>
            <input id={id || name} {...input} placeholder={placeholder || label} {...rest} />
            {touched && error && <span className="form-field-error">{error}</span>}
        </div>
    );
}

InputField.propTypes = {
    input: object.isRequired,
    label: string.isRequired,
    type: string.isRequired,
    meta: shape({ touched: boolean, error: string }).isRequired,
};
