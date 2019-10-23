import { func, object } from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { withTranslation } from "react-i18next";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../actions/auth';
import { usersSelector } from '../reducers/user';
import SignUpForm from '../components/auth/SignUpForm';

import DefaultLayout from '../layouts/DefaultLayout';
import ScrollToTopOnMount from '../components/utils/ScrollToTopOnMount';
import i18n from '../../i18n/i18n';


@withTranslation()
class LoginPage extends React.Component {
    static propTypes = {
        user: object,
        doSignup: func.isRequired,
    };

    static defaultProps = {
        user: null,
    };

    render() {
        const { user, doSignup, t } = this.props;
        if (user) {
            return <Redirect to="/profile/my-account" />;
        }

        return (
            <DefaultLayout>
                <Helmet>
                    <title>{t('common.register')} | {t('meta.title')} - PROJECTNAME.com</title>
                </Helmet>
                <ScrollToTopOnMount />
                <div className="login">
                    <div className="login--main">
                        <h1 className="login--title">{t('common.register')}</h1>
                        <SignUpForm onSubmit={doSignup} />
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
        doSignup: signup,
    }
)(LoginPage);
