import React from 'react';
import { connect } from 'react-redux';
import { shape, string, func } from 'prop-types';
import { Helmet } from 'react-helmet';
import { formValueSelector } from "redux-form";
import { withTranslation } from "react-i18next";

import ProfileLayout from '../layouts/ProfileLayout';
import { usersSelector } from '../reducers/user';
import { userType } from '../types';
import PersonalInfoForm from '../components/profile/PersonalInfoForm';
import PersonalSettingForm from '../components/profile/PersonalSettingForm';
import { updateUser } from '../actions/auth';
import { PERSONAL_INFO_FORM } from "../constants/forms";

@withTranslation()
class MyAccountPage extends React.Component {
    static propTypes = {
        updateUser: func.isRequired,
        user: userType.isRequired,
        userEdited: userType.isRequired,
        match: shape({
            path: string.isRequired,
        }).isRequired,
    };

    getUserFields = (...fields) => fields.reduce((p, c) => Object.assign(p, { [c]: this.props.user[c] }), {});

    handlePersonalInfo = values => this.props.updateUser(values);

    handlePersonalSettings = values => this.props.updateUser({ settings: values });

    render() {
        const {
            user,
            match: { path },
            t,
        } = this.props;

        return (
            <ProfileLayout page={path.split('/').pop()}>
                <Helmet>
                    <title>{t('common.my_account')} | {t('meta.title')} - PROJECTNAME.com</title>
                </Helmet>
                <h1>{t('common.my_account')}</h1>

                <div className="profile__section">
                    <h3>{t('common.personal_information')}</h3>
                    <PersonalInfoForm initialValues={this.props.user} onSubmit={this.handlePersonalInfo} actualValues={this.props.userEdited} />
                    <hr />
                </div>

                <div className="profile__section">
                    <h3>{t('common.settings')}</h3>
                    <PersonalSettingForm initialValues={user.settings} onSubmit={this.handlePersonalSettings} />
                    <hr />
                </div>
            </ProfileLayout>
        );
    }
}

const selector = formValueSelector(PERSONAL_INFO_FORM);
export default connect(
    state => ({
        user: usersSelector(state).loggedInUser,
        userEdited: selector(state, ...Object.keys(usersSelector(state).loggedInUser)),
    }),
    {
        updateUser,
    }
)(MyAccountPage);
