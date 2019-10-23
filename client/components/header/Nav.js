import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { shape, arrayOf } from 'prop-types';
import _get from 'lodash/get';
import { withTranslation } from "react-i18next";

import MobileMenu from './MobileMenu';

@withTranslation()
@withRouter
class Nav extends React.PureComponent {

    static propTypes = {
        categories: arrayOf(shape({})).isRequired,
        history: shape({}).isRequired,
        location: shape({}).isRequired,
    };

    constructor(props) {
        super(props);
        this.unlistenHistory = props.history.listen(this.onChangeLocation);
    }

    state = {
        isMobileMenuOn: false,
        activeCategory: _get(this.props, 'categories.[0]', {}),
        activeSubCategory: _get(this.props, 'categories.[0].links[0]', {}),
    };

    componentDidMount() {
        this.onChangeLocation(this.props.location);
    }

    componentWillUnmount() {
        this.unlistenHistory();
    }

    onChangeLocation = (location) => {
        let selectedCat = {};
        let selectedSubCat = {};

        this.props.categories.forEach(cat => {
            if (cat.link === location.pathname) {
                selectedCat = cat;
            }

            if (cat.links) {
                cat.links.forEach(link => {
                    if (link.link === location.pathname) {
                        selectedCat = cat;
                        selectedSubCat = link;
                    }
                });
            }
        });

        this.setState({ activeCategory: selectedCat, activeSubCategory: selectedSubCat });
    };

    toggleMobileMenu = () => this.setState(prevState => ({ isMobileMenuOn: !prevState.isMobileMenuOn }));

    checkActiveCategory = (cat) => cat.link  === this.state.activeCategory.link ? 'active' : '';

    checkActiveSubCategory = (subCat) => {
        const { activeSubCategory } = this.state;
        if (activeSubCategory && activeSubCategory.link === subCat.link) {
            return 'active';
        }
        return '';
    };

    renderSubCategories = (subCategories) => subCategories && subCategories.length > 0 &&
        subCategories.map(subCategory => (
            <li key={subCategory.name} className="link__list-item">
                <Link
                    to={subCategory.link}
                    alt={subCategory.name}
                    className={`link__list-item-link ${this.checkActiveSubCategory(subCategory)}`}
                >
                    {subCategory.name}
                </Link>
            </li>
        ));

    renderCategories = (categories) =>
        categories.map((category) => (
            <li key={category.name} className={`nav-category ${this.checkActiveCategory(category)} ${category.name}-icon`}>
                <Link to={category.link} alt={category.name} className="nav-link-header">
                    <div className={`${`icon`} icon-${category.icon} mobile`}/>
                    {category.name}
                </Link>
                <span className="nav-category-subheader">{category.name}</span>
                <ul className="link__list desktop">
                    {this.renderSubCategories(category.links)}
                </ul>
            </li>
        ));

    render() {
        const { categories, t } = this.props;
        const { isMobileMenuOn, activeCategory, activeSubCategory } = this.state;

        return (
            <nav className="nav">
                <span className={isMobileMenuOn ? 'nav-mobile open' : 'nav-mobile'} onClick={this.toggleMobileMenu}>
                    <span />
                    <span />
                    <span />
                </span>
                <Link className="app-logo desktop" to="/">
                    PROJECTNAME
                </Link>
                <ul className="nav__list">
                    {this.renderCategories(categories)}
                </ul>
                <div className="lang__list">
                    <a href="?lng=ua"><i className="flag-icon flag-icon-ua"/></a>
                    <a href="?lng=en"><i className="flag-icon flag-icon-gb"/></a>
                </div>
                <input alt={t('common.check_your_favourites')} type="button"
                    className="button fav-button fav-button--check desktop hidden" value="u"/>
                <MobileMenu
                    toggle={ this.toggleMobileMenu }
                    categories={ categories }
                    isOpen={ isMobileMenuOn }
                    activeCategory={ activeCategory }
                    activeSubCategory={ activeSubCategory }
                />
            </nav>
        );
    }
}

export default Nav;
