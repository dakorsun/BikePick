import React from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { Helmet } from 'react-helmet';
import { withTranslation } from "react-i18next";

import DefaultLayout from '../layouts/DefaultLayout';
import { login, resetPasswordRequest } from '../actions/auth';
import { usersSelector } from '../reducers/user';
import SignInForm from '../components/auth/SignInForm';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import ScrollToTopOnMount from '../components/utils/ScrollToTopOnMount';
import i18n from '../../i18n/i18n';


@withTranslation()
class LoginPage extends React.Component {
    static propTypes = {
        user: object,
        doLogin: func.isRequired,
        doResetPasswordRequest: func.isRequired,
    };

    static defaultProps = {
        user: null,
    };

    state = {
        openModal: false,
    };

    openResetPasswordModal = () => {
        this.setState({ openModal: true });
    };

    closeResetPasswordModal = () => {
        this.setState({ openModal: false });
    };

    handleResetPasswordSubmit = async ({ email }) => {
        await this.props.doResetPasswordRequest({ email });
        this.setState({ openModal: false });
    };

    render() {
        const { user, doLogin, t } = this.props;
        const { openModal } = this.state;
        if (user) {
            return <Redirect to="/profile/my-account" />;
        }

        return (
            <DefaultLayout>
                <Helmet>
                    <title>{t('common.login')} | {t('meta.title')} - PROJECTNAME.com</title>
                </Helmet>
                <ScrollToTopOnMount />
                <div className="login">
                    <div className="login--main">
                        <h1 className="login--title">{t('common.register')}</h1>
                        <div className="login--main">
                            <SignInForm onSubmit={doLogin} openResetPasswordModal={this.openResetPasswordModal} />
                            <span className="login--or">{t('common.or')}</span>
                            <Link to="/registration">
                                <input type="button" className="button" alt={t('common.register')} value={t('common.register')} />
                            </Link>

                            <Modal open={openModal} onClose={this.closeResetPasswordModal} center>
                                <div className="auth__reset-password-modal">
                                    <h2>{t('common.reset_password')}</h2>
                                    <ResetPasswordForm onSubmit={this.handleResetPasswordSubmit} />
                                </div>
                            </Modal>
                        </div>
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
        doLogin: login,
        doResetPasswordRequest: resetPasswordRequest,
    }
)(LoginPage);
