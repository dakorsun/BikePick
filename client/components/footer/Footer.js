import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { shape, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import i18n from '../../../i18n/i18n';

@connect(
    state => ({
        content: state.staticContent.footer,
        user: state.user.user,
    }),
)
class Footer extends PureComponent {
    static propTypes = {
        content: shape({
            categories: arrayOf(shape({})).isRequired,
        }),
    };

    static defaultProps = {
        content: {
            categories: [],
        },
    };

    renderLinks = links => (
        <ul className="link__list">
            {
                links.map(e =>
                    <li key={e.name} className="header--linkList-item ">
                        <Link to={e.link} className="header--linkList-item-link header--linkList-item-link--capital">
                            {e.name}
                        </Link>
                    </li>
                )
            }
        </ul>
    );

    render() {
        const { content: { categories } } = this.props;
        return (
            <footer className="footer">
                <div className="footer-wrapper">
                    <span className="app-logo">PROJECTNAME</span>
                    <ul className="footer-links">
                        {
                            categories.map(item =>
                                <li key={item.name} className="footer-categories">
                                    <h2 className="footer-link-header">{item.name}</h2>
                                    {this.renderLinks(item.links)}
                                </li>
                            )
                        }
                    </ul>
                    <span className="footer-copyright">
                        {i18n.t('common.copyright_text', { year: (new Date()).getFullYear() })}
                    </span>
                </div>
            </footer>
        );
    }
}

export default Footer;
