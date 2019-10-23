import React from 'react';
import { func, node, string } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from "react-i18next";
import i18n from '../../i18n/i18n';
import DefaultLayout from './DefaultLayout';
import { me } from '../actions/auth';
import { usersSelector } from '../reducers/user';
import { userType } from '../types';
import { ROLE_ADMINISTRATOR } from "../../shared/constants/userRoles";

@withTranslation()
class ProfileLayout extends React.PureComponent {
    static propTypes = {
        children: node.isRequired,
        user: userType.isRequired,
        me: func.isRequired,
        page: string.isRequired,
    };

    componentDidMount() {
        if (!(this.props.user && this.props.user.firstName)) {
            this.props.me();
        }
    }

    isActivePage = pageName => (this.props.page === pageName
        ? 'active'
        : '');

    renderAdminTabs = (user) => {
        const { t } = this.props;
        if (user.role !== ROLE_ADMINISTRATOR) {
            return null;
        }

        return (
            <li>
                <Link to="/statistics/redirects"
                    className={`profile__menu--root-row ${this.isActivePage('statistics/redirects')}`}>
                    <span className="icon icon-record profile__menu--icon"/>
                    <span>{t('common.statistics')}</span>
                </Link>
                <ul>
                    <li>
                        <Link to="/statistics/redirects">{t('common.redirects')}</Link>
                    </li>
                    <li>
                        <Link to="/statistics/monitoring">{t('common.monitoring_live_updates')}</Link>
                    </li>
                </ul>
            </li>
        );
    };

    render() {
        const { t } = this.props;

        return (
            <DefaultLayout>
                <div className="profile__page">
                    <aside className="profile__menu">
                        <ul>
                            <li>
                                <Link to="/profile/my-account"
                                    className={`profile__menu--root-row ${this.isActivePage('my-account')}`}>
                                    <span className="icon icon-record profile__menu--icon"/>
                                    <span>{t('common.my_account')}</span>
                                </Link>
                                <ul>
                                    <li>
                                        <Link to="/profile/my-account/#personal-info">
                                            {t('common.personal_info')}
                                        </Link>
                                    </li>
                                    <li className="hidden">
                                        <Link to="/profile/my-account/#subscription-and-billing">
                                            {t('common.subscription_and_billing')}
                                        </Link>
                                    </li>
                                    <li className="hidden">
                                        <Link to="/profile/my-account/#settings">
                                            {t('common.settings')}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/profile/my-favourites"
                                    className={`profile__menu--root-row ${this.isActivePage('my-favourites')} coming-soon--hover`}
                                    data-content={i18n.t('common.coming_soon')}>
                                    <span className="icon icon-record profile__menu--icon"/>
                                    <span>{t('common.my_favorites')}</span>
                                </Link>
                            </li>
                            {this.renderAdminTabs(this.props.user)}
                        </ul>
                    </aside>
                    <div className="profile__content">{this.props.children}</div>
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
        me,
    },
)(ProfileLayout);
