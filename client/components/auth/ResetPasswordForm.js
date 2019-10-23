import React from 'react';
import { object, func, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import _isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { RESET_PASS_FORM } from '../../constants/forms';
import InputField from '../common/InputField';
import i18n from './../../../i18n/i18n';

const validate = values => {
    const errors = {};
    if (_isEmpty(values.email)) {
        errors.email = i18n.t('validation.field_must_be_provided', { field: i18n.t('field.email') });
    }
    return errors;
};

const email = value => (value && !/^([A-Z0-9_%+-]+(\.[A-Z0-9_%+-]+)*)@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined);

const ResetPasswordForm = props => {
    const { t } = useTranslation();
    const { error, handleSubmit, submitting, invalid, pristine } = props;
    return (
        <form className="auth__reset" onSubmit={handleSubmit}>
            <Field type="text" name="email" component={InputField} label="Email" validate={[email]} />

            {error && <strong>{error}</strong>}
            <div className="form-field">
                <button className="button" type="submit" disabled={pristine || invalid || submitting}>
                    {t('common.reset_password')}
                </button>
            </div>
        </form>
    );
};

ResetPasswordForm.propTypes = {
    error: object,
    invalid: bool.isRequired,
    pristine: bool.isRequired,
    handleSubmit: func.isRequired,
    submitting: bool.isRequired,
};

ResetPasswordForm.defaultProps = {
    error: null,
};

export default reduxForm({
    form: RESET_PASS_FORM,
    validate,
})(ResetPasswordForm);
