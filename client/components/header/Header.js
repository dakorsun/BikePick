import React, { PureComponent } from 'react';
import { func, shape, arrayOf } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from "react-i18next";

import Nav from './Nav';
import { userType } from '../../types';
import { logout } from '../../actions/auth';

@withTranslation()
@connect(
    state => ({
        content: state.staticContent.header,
        user: state.user.user,
    }),
    {
        logout,
    }
)
class Header extends PureComponent {
    static propTypes = {
        content: shape({
            topLeftLinks: arrayOf(shape({})).isRequired,
            topRightLinks: arrayOf(shape({})).isRequired,
            categories: arrayOf(shape({})).isRequired,
        }),
        user: userType,
        logout: func,
    };

    static defaultProps = {
        user: null,
        content: {
            topLeftLinks: [],
            topRightLinks: [],
            categories: [],
        },
        logout: () => {},
    };

    Aux = props => props.children;

    renderLinks = links =>
        links.map(e => (
            <li key={ e.name } className="header--linkList-item ">
                <Link to={ e.link } className="header--linkList-item-link header--linkList-item-link--capital" alt={ e.name }>
                    { e.name }
                </Link>
            </li>
        ));

    renderAuthLinks = user => {
        if (user) {
            return (
                <this.Aux>
                    <li className="header--linkList-item">
                        <Link className="header--linkList-item header--linkList-item-link" to="/profile/my-account">
                            {this.props.t('common.my_account')}
                        </Link>
                    </li>
                    <li className="header--linkList-item">
                        <input type="button" className="button loginButton" onClick={ this.props.logout } value={this.props.t('common.logout')}/>
                    </li>
                </this.Aux>
            );
        }

        return (
            <li className="header--linkList-item">
                <Link className="button loginButton" to={ '/login' }>
                    {this.props.t('common.log_in')}/{this.props.t('common.join')}
                </Link>
            </li>
        );
    };

    render() {
        const { content, user } = this.props;
        return (
            <header className="header">
                <div className="header--top">
                    <ul className="header--linkList">{ this.renderLinks(content.topLeftLinks) }</ul>
                    <Link className="app-logo mobile" to="/" alt="home">
                        PROJECTNAME
                    </Link>
                    <ul className="header--linkList header--linkList-right">
                        { this.renderLinks(content.topRightLinks) }
                        { this.renderAuthLinks(user) }
                    </ul>
                    <div className="fav-button fav-button--check mobile coming-soon" data-content={this.props.t('common.coming_soon')}>
                        <div className="icon icon-star-white"/>
                    </div>
                </div>
                <Nav categories={ content.categories }/>
            </header>
        );
    }
}

export default Header;
