import React from 'react';
import { func, bool, shape, arrayOf } from 'prop-types';
import { Link } from 'react-router-dom';
import { withTranslation } from "react-i18next";

@withTranslation()
class MobileMenu extends React.PureComponent {
    static propTypes = {
        toggle: func.isRequired,
        isOpen: bool.isRequired,
        activeCategory: shape({}).isRequired,
        activeSubCategory: shape({}).isRequired,
        categories: arrayOf(shape({})).isRequired,
    };

    onCategoryClick = (category) => () => {
        if (!(category.links && category.links.length > 0)) {
            this.props.toggle();
        }
    };

    isActiveCategory = (cat) => cat.link === this.props.activeCategory.link;

    isActiveSubCategory = (subCat) => this.props.activeSubCategory && this.props.activeSubCategory.link === subCat.link;

    renderSubCategories = (subCategories) => subCategories && subCategories.length > 0 && subCategories.map(subCategory => (
        <li key={ subCategory.name } className="mobilmenu__container-list-item">
            <Link
                to={ subCategory.link }
                alt={ subCategory.name }
                className={ `mobilmenu__container-list-item-link ${this.isActiveSubCategory(subCategory) ? 'active' : ''}` }
                onClick={ this.props.toggle }
            >
                { subCategory.name }
            </Link>
        </li>
    ));

    renderCategories = (categories) => categories.map((category) => (
        <li key={ category.name }
            className={ `nav-category ${this.isActiveCategory(category) ? 'active' : ''} ${category.name}-icon` }>
            <Link
                to={ category.link }
                alt={ category.name }
                className="nav-link-header"
                onClick={ this.onCategoryClick(category) }
            >
                <span className={ `${`icon`} icon-${category.icon} mobile` }/>
                <span className="nav-category--title">{ category.name }</span>
            </Link>
            {
                this.isActiveCategory(category) && (
                    <ul className="mobilmenu__container-list sublist">
                        { this.renderSubCategories(category.links) }
                    </ul>
                )
            }
        </li>
    ));

    render() {
        const { isOpen, categories, toggle, t } = this.props;
        return (
            <div className={ isOpen ? 'mobilmenu open' : 'mobilmenu' }>
                <div className="mobilmenu__main">
                    <div className="mobilmenu__container">
                        <span className="mobilmenu__container-header app-logo small">PROJECTNAME</span>
                        <ul className="mobilmenu__container-list">
                            { this.renderCategories(categories) }
                        </ul>
                    </div>
                    <div className="mobilmenu__container">
                        <span className="mobilmenu__container-header">{t('common.account')}</span>
                        <ul className="mobilmenu__container-list">
                            <li className="mobilmenu__container-list-item mobilmenu__container-list-item-menulink">
                                <a href="/login" className="mobilmenu__container-list-item-link">
                                    {t('common.login')}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mobilmenu__container">
                        <span className="mobilmenu__container-header">{t('common.specials')}</span>
                        <ul className="mobilmenu__container-list">
                            <li className="mobilmenu__container-list-item">
                                <a href="/tips" className="mobilmenu__container-list-item-link">
                                    {t('common.tips_and_tricks')}
                                </a>
                            </li>
                            <li className="mobilmenu__container-list-item">
                                <a href="/offers" className="mobilmenu__container-list-item-link">
                                    {t('common.offers_and_bonuses')}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mobilmenu__container">
                        <span className="mobilmenu__container-header">{t('common.about')}&nbps;PROJECTNAME</span>
                        <ul className="mobilmenu__container-list">
                            <li className="mobilmenu__container-list-item">
                                <a href="/page/contact-us"
                                    className="mobilmenu__container-list-item-link">
                                    {t('common.help')}
                                </a>
                            </li>
                            <li className="mobilmenu__container-list-item">
                                <a href="/page/contact-us"
                                    className="mobilmenu__container-list-item-link">
                                    {t('common.contact_us')}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mobilmenu__container">
                        <span className="mobilmenu__container-header">{t('common.promotion')}</span>
                        <ul className="mobilmenu__container-list">
                            <li className="mobilmenu__container-list-item">
                                <a href="" className="mobilmenu__container-list-item-link">
                                    {t('common.up_to_amount_currency_free_bet', { amount: '30', currency: 'Euro' })}
                                </a>
                            </li>
                            <li className="mobilmenu__container-list-item">
                                <a href="" className="mobilmenu__container-list-item-link">
                                    {t('common.up_to_amount_currency_free_bet', { amount: '100', currency: 'Euro' })}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mobilmenu-close" onClick={ toggle }/>
            </div>
        );
    }
}

export default MobileMenu;
