import React from 'react';
import { shape, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { withTranslation } from "react-i18next";

import DefaultLayout from '../layouts/DefaultLayout';
import { resetPassword } from '../actions/auth';
import { usersSelector } from '../reducers/user';
import ResetPasswordConfirmForm from '../components/auth/ResetPasswordConfirmForm';
import { userType } from '../types';
import i18n from '../../i18n/i18n';


@withTranslation()
class ResetPasswordPage extends React.Component {
    static propTypes = {
        match: shape({
            params: {
                token: string.isRequired,
            }.isRequired,
        }).isRequired,
        history: shape({}).isRequired,
        user: userType,
        doResetPassword: func.isRequired,
    };

    static defaultProps = {
        user: null,
    };

    handleSubmit = async ({ password }) => {
        const { doResetPassword, history, match } = this.props;

        await doResetPassword({ password, token: match.params.token });
        history.push('/login');
    };

    render() {
        const { user, t } = this.props;
        if (user) {
            return <Redirect to={'/'} />;
        }

        return (
            <DefaultLayout>
                <Helmet>
                    <title>{t('common.reset_password')} | {t('meta.title')} - PROJECTNAME.com</title>
                </Helmet>
                <div className="login">
                    <div className="login--main">
                        <h1 className="login--title">{t('common.reset_password')}</h1>
                        <ResetPasswordConfirmForm onSubmit={this.handleSubmit} />
                    </div>
                </div>
            </DefaultLayout>
        );
    }
}

export default connect(
    state => ({
        user: usersSelector(state).loggedInUser,
    }),
    {
        doResetPassword: resetPassword,
    }
)(ResetPasswordPage);
