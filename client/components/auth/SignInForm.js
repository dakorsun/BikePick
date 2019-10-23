import React from 'react';
import { object, func, bool } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import _isEmpty from 'lodash/isEmpty';
import { SIGN_IN_FORM } from '../../constants/forms';
import InputField from '../common/InputField';
import i18n from './../../../i18n/i18n';

const validate = values => {
    const errors = {};
    if (_isEmpty(values.email)) {
        errors.email = i18n.t('validation.field_must_be_provided', { field: i18n.t('field.email') });
    }
    if (_isEmpty(values.password)) {
        errors.password = i18n.t('validation.field_must_be_provided', { field: i18n.t('field.password') });
    }
    return errors;
};

const SignInForm = props => {
    const { t } = useTranslation();
    const { error, handleSubmit, pristine, invalid, submitting, openResetPasswordModal } = props;
    return (
        <form className="auth__signup" onSubmit={handleSubmit}>
            <Field type="text" name="email" component={InputField} label={t('field.email')}/>
            <Field type="password" name="password" component={InputField} label={t('field.password')}/>

            {error && <strong>{error}</strong>}

            <input type="button"
                className="input-as-link login--already-account"
                alt={t('common.forgot_password_question')}
                value={t('common.forgot_password_question')}
                onClick={openResetPasswordModal}
            />
            <div>
                <button type="submit" className="button" disabled={invalid || pristine || submitting}>
                    {t('common.sign_in')}
                </button>
            </div>
        </form>
    );
};

SignInForm.propTypes = {
    error: object,
    handleSubmit: func.isRequired,
    openResetPasswordModal: func.isRequired,
    pristine: bool.isRequired,
    invalid: bool.isRequired,
    submitting: bool.isRequired,
};

SignInForm.defaultProps = {
    error: null,
};

export default reduxForm({
    form: SIGN_IN_FORM,
    validate,
})(SignInForm);
