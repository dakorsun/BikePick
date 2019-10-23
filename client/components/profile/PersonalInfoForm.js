import React from 'react';
import { object, func, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import _isEmpty from 'lodash/isEmpty';
import phoneCodes from '../../constants/phoneCodes';

import { PERSONAL_INFO_FORM } from '../../constants/forms';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import countries from '../../utils/countries';
import i18n from './../../../i18n/i18n';

const validate = values => {
    const errors = {};
    // if (_isEmpty(values.firstName)) {
    //     errors.firstName = i18n.t('validation.field_must_be_provided', {field: i18n.t('field.first_name')});
    // }
    // if (_isEmpty(values.lastName)) {
    //     errors.lastName = i18n.t('validation.field_must_be_provided', {field: i18n.t('field.last_name')});
    // }
    if (_isEmpty(values.password)) {
        errors.password = i18n.t('validation.field_must_be_provided', { field: i18n.t('field.password') });
    }
    // if (_isEmpty(values.country)) {
    //     errors.country = i18n.t('validation.field_must_be_provided', {field: i18n.t('field.country')});
    // } else if (values.country === 'SE') {
    //     if (_isEmpty(values.personalNumber)) {
    //         errors.personalNumber = i18n.t('validation.field_must_be_provided', {field: i18n.t('field.personal_number')});
    //     } else if (values.personalNumber.length !== 12) {
    //         errors.personalNumber = i18n.t('validation.personal_number_must_be_digits_long');
    //     }
    // }
    return errors;
};

class PersonalInfoForm extends React.PureComponent {

    static propTypes = {
        error: object,
        handleSubmit: func.isRequired,
        pristine: bool.isRequired,
        invalid: bool.isRequired,
        submitting: bool.isRequired,
        actualValues: object.isRequired,
    };

    static defaultProps = {
        error: null,
    };

    state = {
        passwordEditable: false,
        phoneCodes,
    };

    changePassword = () => {
        this.setState({ passwordEditable: true });
    };

    renderPersonalNumberField = (country) => {
        if (country !== 'SE') {
            return null;
        }
        return (
            <Field type="text" name="personalNumber" maxLength="12" placeholder="YYYYMMDDNNNN" component={InputField} label={i18n.t('field.personal_number')}/>
        );
    };

    renderPasswordField = () => {
        if (this.state.passwordEditable) {
            return (
                <div className="profile__password-field">
                    <Field type="password" name="password" component={InputField} label={i18n.t('field.password')}
                        placeholder={i18n.t('common.enter_new_password')}/>
                </div>
            );
        }

        return (
            <div className="profile__password-field">
                <span>{i18n.t('field.password')}</span>
                <span className="profile__additional-info-label"onClick={this.changePassword}>
                    {i18n.t('common.change_password')}
                </span>
                <div>
                    <input id="password" name="password" type="text" placeholder={i18n.t('common.enter_new_password')} disabled/>
                </div>
            </div>
        );
    };

    render() {
        const { error, handleSubmit, pristine, invalid, submitting } = this.props;

        return (
            <form className="profile__personal-info--form" onSubmit={handleSubmit}>
                <Field type="text" name="email" component={InputField} label={i18n.t('field.email')}/>
                <Field type="text" name="firstName" component={InputField} label={i18n.t('field.first_name')}/>
                <Field type="text" name="lastName" component={InputField} label={i18n.t('field.last_name')}/>
                <Field label={i18n.t('field.gender')} name="gender" component={SelectField}>
                    <option value="">- {i18n.t('field.select')} -</option>
                    <option key="male" value="male">{i18n.t('field.gender_male')}</option>
                    <option key="female" value="female">{i18n.t('field.gender_female')}</option>
                </Field>
                <Field label={i18n.t('field.country')} name="country" component={SelectField} id="Stad">
                    <option value="">- {i18n.t('field.select')} -</option>
                    {countries.map(c => <option key={c.name} value={c.code}>{c.name}</option>)}
                </Field>

                {this.renderPersonalNumberField(this.props.actualValues.country)}
                <Field type="text" name="address" component={InputField} label={i18n.t('field.address')}/>
                <Field type="text" name="city" component={InputField} label={i18n.t('field.country')}/>
                <Field type="text" name="postCode" component={InputField} label={i18n.t('field.post_code')}/>
                <Field label={i18n.t('field.phone_code')} name="phoneCode" component={SelectField}>
                    <option value="">- {i18n.t('field.select')} -</option>
                    {this.state.phoneCodes.map(code => (<option key={code} value={code}>+{code}</option>))}
                </Field>
                <Field type="text" name="phoneNumber" component={InputField} label={i18n.t('field.phone_number')}/>

                {this.renderPasswordField()}

                {error && <strong>{error}</strong>}
                <div>
                    <button type="submit" className="button" disabled={invalid || pristine || submitting}>
                        {i18n.t('field.update_personal_info')}
                    </button>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    enableReinitialize: true,
    form: PERSONAL_INFO_FORM,
    validate,
})(PersonalInfoForm)
