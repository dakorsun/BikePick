import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withTranslation } from "react-i18next";

import DefaultLayout from '../layouts/DefaultLayout';
import { usersSelector } from '../reducers/user';
import { userType } from '../types';
import i18n from '../../i18n/i18n';


@withTranslation()
@connect(
    state => ({
        user: usersSelector(state).loggedInUser,
    })
)
class EmailConfirmationPage extends React.PureComponent {

    static propTypes = {
        user: userType,
    };

    static defaultProps = {
        user: null,
    };

    renderConfirmed = () => {
        const { user, t } = this.props;

        if (user) {
            if (user.confirmed) {
                return <h2 className="">{t('common.email_has_been_successfully_confirmed')}</h2>;
            }
            return <h2>{t('common.email_has_not_confirmed_yet')}</h2>;
        }

        return <Redirect to={ '/' }/>;
    };

    render() {
        const { t } = this.props;
        return (
            <DefaultLayout>
                <Helmet>
                    <title>{t('common.email_confirmation')} | {t('meta.title')} - PROJECTNAME.com</title>
                </Helmet>
                <div className="email-confirmation">
                    <div className="email-confirmation--main">
                        { this.renderConfirmed() }
                    </div>
                </div>
            </DefaultLayout>
        )
    }
}

export default EmailConfirmationPage;
