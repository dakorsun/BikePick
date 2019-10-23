import React from 'react';
import { string, boolean, object, shape } from 'prop-types';

export default function SelectField({ input, name, id, label, meta: { touched, error }, children, ...rest }) {
    return (
        <div className="form-field">
            <label htmlFor={id || name}>{label}</label>
            <div className="selectContainer">
                <select id={id || name} {...input} {...rest}>
                    {children}
                </select>
                {touched && error && <span className="form-field-error">{error}</span>}
            </div>
        </div>
    );
}

SelectField.propTypes = {
    input: object.isRequired,
    label: string.isRequired,
    meta: shape({ touched: boolean, error: string }).isRequired,
};
