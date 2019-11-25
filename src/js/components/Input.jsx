import React from 'react'; 
import './input.scss';
import classNames from 'classnames';

const Input = (props) => (
    <div className={classNames("form-group", props.className)}>
        <label htmlFor={props.name} className="form-label">{props.title}</label>
        <input
            className="form-input"
            id={props.name}
            name={props.name}
            type={props.type}
            value={props.value}
            onChange={props.handleChange}
            placeholder={props.placeholder}
        />
    </div>
);

export default Input;