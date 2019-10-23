import React from 'react';
import { object, func, bool } from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import timezoneNames from '../../../shared/utils/timezoneNames.json';

import { PROFILE_SETTINGS_FORM } from '../../constants/forms';
import currencies from '../../constants/currencies';
import i18n from './../../../i18n/i18n';

class PersonalSettingForm extends React.PureComponent {
    render() {
        const { error, handleSubmit, pristine, invalid, submitting } = this.props;

        return (
            <form className="profile__personal-info--form" onSubmit={handleSubmit}>
                <div>
                    <label>{i18n.t('common.currency')}</label>
                    <div className="selectContainer">
                        <Field name="currency" component="select">
                            <option value="">- {i18n.t('field.select')} -</option>
                            {
                                currencies.map(c => <option key={c.name} value={c.code}>{c.name}</option>)
                            }
                        </Field>
                    </div>
                </div>
                <div>
                    <label>{i18n.t('common.time_zone')}</label>
                    <div className="selectContainer">
                        <Field name="timezone" component="select">
                            <option value="">- {i18n.t('field.select')} -</option>
                            {
                                timezoneNames.map(tz => <option key={tz} value={tz}>{tz}</option>)
                            }
                        </Field>
                    </div>
                </div>

                {error && <strong>{error}</strong>}
                <div>
                    <button type="submit" className="button" disabled={invalid || pristine || submitting}>
                        {i18n.t('common.update_settings')}
                    </button>
                </div>
            </form>
        )
    }
}

PersonalSettingForm.propTypes = {
    error: object,
    handleSubmit: func.isRequired,
    pristine: bool.isRequired,
    invalid: bool.isRequired,
    submitting: bool.isRequired,
};

PersonalSettingForm.defaultProps = {
    error: null,
};

export default reduxForm({
    enableReinitialize: true,
    form: PROFILE_SETTINGS_FORM,
})(PersonalSettingForm)
