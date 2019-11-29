
import React from 'react';
import classNames from 'classnames';

import './swiper.scss';

const Swipe = (props) => (
    <div className={classNames("form-group", props.className)}>
        <span className="form-label">{props.label}</span>
        <label className="switch">
            <input type="checkbox" onChange={props.handleChange} />
            <span className="slider round"></span>
            { props.optin && <span className="slider-offtext">{props.offText}</span>}
            { !props.optin && <span className="slider-ontext">{props.onText}</span>}
        </label>
    </div>
);
    
export default Swipe;
