import React from 'react'; 
import './input.scss';
import classNames from 'classnames';

const Textarea = (props) => (
    <div className={classNames("form-group", props.className)}>
        <label htmlFor={props.name} className="form-label">{props.title}</label>
        <textarea
            className="form-input"
            id={props.name}
            name={props.name}
            value={props.value}
            onChange={props.handleChange}
            placeholder={props.placeholder}
            required
        />
    </div>
);

export default Textarea;