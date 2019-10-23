import React from 'react';
import { string, func, bool } from 'prop-types';
import { withTranslation } from "react-i18next";
import { Field, reduxForm } from 'redux-form';
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";

import phoneCodes from '../../constants/phoneCodes';
import { SIGN_UP_FORM } from '../../constants/forms';
import InputField from '../common/InputField';
import i18n from './../../../i18n/i18n';

const required = value => (value || typeof value === 'number' ? undefined : i18n.t('validation.required'));
const email = value => (value && !/^([A-Z0-9_%+-]+(\.[A-Z0-9_%+-]+)*)@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? i18n.t('validation.invalid_email_address') : undefined);

const validate = values => {
    const errors = {};
    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = i18n.t('validation.password_must_match_password_confirmation');
    }
    return errors;
};

@withTranslation()
class SignUpForm extends React.Component {

    static propTypes = {
        handleSubmit: func.isRequired,
        reset: func.isRequired,
        error: string,
        pristine: bool.isRequired,
        submitting: bool.isRequired,
        invalid: bool.isRequired,
        onSuccess: func,
    };

    static defaultProps = {
        error: null,
        onSuccess: null,
    };

    state = {
        open: false,
        phoneCodes,
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { error, handleSubmit, pristine, reset, submitting, invalid, t } = this.props;
        const { open } = this.state;

        return (
            <div className="login--main">
                <form className="auth__signup" onSubmit={handleSubmit}>
                    <Field type="text" name="email" component={InputField} label={t('field.email')} validate={[required, email]}/>
                    {/* <Field type="text" name="firstName" component={InputField} label={t('field.first_name')} validate={[required]}/> */}
                    {/* <Field type="text" name="lastName" component={InputField} label={t('field.last_name')} validate={[required]}/> */}
                    {/* <Field label={t('field.gender')} name="gender" component={SelectField}> */}
                    {/* <option value="">- {t('field.select')} -</option> */}
                    {/* <option key="male" value="male">{t('field.gender_male')}</option> */}
                    {/* <option key="female" value="female">{t('field.gender_female')}</option> */}
                    {/* </Field> */}
                    <Field type="date" name="birthDate" component={InputField} label={t('field.birth_date')} validate={[required]}/>
                    {/* <Field label={t('field.country')} name="country" component={SelectField} validate={[required]}> */}
                    {/* <option value="">- {t('field.select')} -</option> */}
                    {/* {countries.map(c => (<option key={c.name} value={c.code}>{c.name}</option>))} */}
                    {/* </Field> */}
                    {/* <Field type="text" name="personalNumber" component={InputField} maxLength="12" label={t('field.personal_number')} placeholder="YYYYMMDDNNNN" /> */}
                    {/* <Field type="text" name="address" component={InputField} label={t('field.address')} validate={[required]}/> */}
                    {/* <Field type="text" name="city" component={InputField} label={t('field.city')} validate={[required]}/> */}
                    {/* <Field type="text" name="postCode" component={InputField} label={t('field.post_code')} validate={[required]}/> */}
                    {/* <Field label={t('field.phone_code')} name="phoneCode" component={SelectField} validate={[required]}> */}
                    {/* <option value="">- {t('field.select')} -</option> */}
                    {/* {this.state.phoneCodes.map(code => (<option key={code} value={code}>+{code}</option>))} */}
                    {/* </Field> */}
                    {/* <Field type="text" name="phoneNumber" component={InputField} label={t('field.phone_number')} validate={[required]}/> */}
                    <Field type="password" name="password" component={InputField} label={t('field.password')} validate={[required]}/>
                    <Field type="password" name="confirmPassword" component={InputField} label={t('field.password_confirm')} validate={[required]}/>

                    <div className="auth__signup--terms">
                        <Field type="checkbox" component="input"
                            name="termsAndConditionsAccepted"
                            id="termsAndConditionsAccepted"
                            label={t('common.i_am_at_least_18_years_old_and_o_accept')}
                            validate={[required]}
                        />
                        <label htmlFor="termsAndConditionsAccepted">
                            {t('common.i_am_at_least_18_years_old_and_o_accept')} &nbsp;
                            <input
                                type="button"
                                className="input-as-link auth__signup--terms-link"
                                alt={t('common.terms_and_conditions')}
                                value={t('common.terms_and_conditions')}
                                onClick={this.onOpenModal}
                            />
                        </label>
                    </div>

                    {error && <strong>{error}</strong>}
                    <div>
                        <input type="submit" className="button auth__signup--submit" value={t('common.register')}
                            disabled={invalid || submitting}/>
                        <input type="button" className="button auth__signup--reset" value={t('common.reset')}
                            disabled={pristine || submitting} onClick={reset}/>
                    </div>
                </form>

                <Modal open={open} onClose={this.onCloseModal} center>
                    <span>{t('common.terms_and_conditions')}</span>
                </Modal>

                <Link to="/login" className="input-as-link login--already-account">
                    {t('common.back_to_login_page')}
                </Link>
            </div>
        )
    }
}

export default reduxForm({
    form: SIGN_UP_FORM,
    validate,
    onSubmitSuccess: (result, dispatch, props) => {
        if (props.onSuccess) {
            props.onSuccess();
        }
    },
})(SignUpForm)
