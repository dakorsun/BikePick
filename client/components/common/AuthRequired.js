import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import _get from 'lodash/get';

import { ROLE_USER } from '../../../shared/constants/userRoles';

function AuthRequired(props) {
    return (
        props.authorities.includes(_get(props, 'user.user.role'))
            ? props.children
            : <Redirect to={'/login'}/>
    );
}

AuthRequired.propTypes = {
    authorities: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.object,
};

AuthRequired.defaultProps = {
    authorities: [ROLE_USER],
    children: null,
};

export default connect(
    (state) => ({
        user: state.user,
    }),
)(AuthRequired);
