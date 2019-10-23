import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { func, arrayOf, shape, node, string, bool } from 'prop-types';
import { withTranslation } from "react-i18next";

@withTranslation()
class CommonLayout extends React.Component {

    static propTypes = {
        children: node.isRequired,
        breadcrumbs: arrayOf(
            shape({
                link: string.isRequired,
                name: string.isRequired,
            })
        ),
    };

    static defaultProps = {
        breadcrumbs: null,
        currentCategories: null,
    };

    componentDidMount() {
        // if (!this.props.popularEntities.length) {
        //     this.props.getPopularEntities();
        // }
    }

    renderMobileAdditionalLinks = links =>
        links.map(link => (
            <li key={link.name} className="link__list-item">
                <Link to={link.link} alt={link.name} className="link__list-item-link">
                    {link.name}
                </Link>
            </li>
        ));

    render() {
        const {
            children,
            t,
        } = this.props;
        let additionalMobileLinks = [];

        return (
            <div>
                <div className={`main`}>
                    <aside className="aside aside-left show-for-large" />
                    <div className="alternative-nav show-for-small">
                        <ul id="mobile-category-links" className="link__list mobile">
                            {this.renderMobileAdditionalLinks(additionalMobileLinks)}
                        </ul>
                    </div>
                    <div className={`main-content ${'no-sidebar' || ''}`}>{children}</div>
                    <aside className="aside aside-right" />
                </div>
                <div className="wrapper additionalContent" />
            </div>
        );
    }
}

export default connect(
    state => ({
        staticContent: state.staticContent,
        categoryTree: state.categoryTree,
    }),
    {
    }
)(CommonLayout);
