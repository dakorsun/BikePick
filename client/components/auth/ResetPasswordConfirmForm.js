import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import _isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { RESET_PASS_CONFIRM_FORM } from '../../constants/forms';
import InputField from '../common/InputField';
import i18n from './../../../i18n/i18n';

const validate = values => {
    const errors = {};
    if (_isEmpty(values.password)) {
        errors.email = i18n.t('validation.field_must_be_provided', { field: i18n.t('field.email') });
    }
    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = i18n.t('validation.password_must_match_password_confirmation');
    }
    return errors;
};

const ResetPasswordConfirmForm = props => {
    const { t } = useTranslation();
    const { error, handleSubmit, submitting, invalid, pristine } = props;
    return (
        <form className="auth__signup" onSubmit={handleSubmit}>
            <Field type="password" name="password" component={InputField} label={t('field.password')}/>
            <Field type="password" name="confirmPassword" component={InputField} label={t('field.password_confirm')}/>

            {error && <strong>{error}</strong>}
            <div className="form-field">
                <button type="submit" className="button" disabled={invalid || pristine || submitting}>
                    {t('common.confirm_reset_password')}
                </button>
            </div>
        </form>
    );
};

ResetPasswordConfirmForm.propTypes = {
    error: string,
    handleSubmit: func.isRequired,
    submitting: bool.isRequired,
    pristine: bool.isRequired,
    invalid: bool.isRequired,
};

ResetPasswordConfirmForm.defaultProps = {
    error: null,
};

export default reduxForm({
    form: RESET_PASS_CONFIRM_FORM,
    validate,
})(ResetPasswordConfirmForm);
