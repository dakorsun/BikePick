import React from 'react';
import { bool } from 'prop-types';
import { connect } from "react-redux";
import { loadingStateSelector } from "../../reducers/loading";

function Loading({ isLoading }) {
    return (
        <div className={isLoading ? 'page-loader' : ''}/>
    )
}

Loading.propTypes = {
    isLoading: bool.isRequired,
};

export default connect(
    state => ({
        isLoading: loadingStateSelector(state).isLoading,
    }),
    {}
)(Loading);
