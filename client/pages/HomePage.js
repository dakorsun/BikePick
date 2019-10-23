import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, func, shape, number } from 'prop-types';
import { withTranslation } from 'react-i18next';

import CommonLayout from '../layouts/CommonLayout';

@withTranslation()
@connect(
    state => ({}),
    {},
)
class HomePage extends React.Component {
  static propTypes = {};

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  render() {
      const {
          t,
      } = this.props;

      return (
          <CommonLayout>
              {t('Home page')}
          </CommonLayout>
      );
  }
}

export default HomePage;
