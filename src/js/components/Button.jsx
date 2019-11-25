import React from 'react';

const Button = (props) => (
    <button
        className={props.className}
        style={props.style}
        onClick={props.action}>
        {props.title}
    </button>
);

export default Button;