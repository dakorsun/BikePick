import React from 'react';
import { number } from 'prop-types';

const CircularProgress = ({ size }) => (
    <div className="circular-progress" style={ { width: `${size}px`, height: `${size}px` } } role="progressbar">
        <svg className="jwc5s6h" viewBox="22 22 44 44">
            <circle className="circular-progress__circle" cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6"/>
        </svg>
    </div>
);

CircularProgress.propTypes = {
    size: number,
};

CircularProgress.defaultProps = {
    size: 40,
};

export default CircularProgress;
