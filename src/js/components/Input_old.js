import React, { Component } from "react";
import PropTypes from "prop-types";

class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            email: props.email
        }
    }
    
    shouldComponentUpdate(nextProps) {
        console.log((this.props.name !== nextProps.name || this.props.email !== nextProps.email));
        return (this.props.name !== nextProps.name || this.props.email !== nextProps.email);
    }

    render() {

        const { label, personId, value, handleChange, removePerson } = this.props;
        const { name, email } = this.state;
        return ( 
            <div className="form-group">
                <label htmlFor={label}>{label}</label>
                <input
                    type="text"
                    className="form-control"
                    id={`name_${personId}`}
                    placeholder="name"
                    value={name}
                    onChange={(e) => handleChange( personId, "name", e )}
                />
                <input
                    type="email"
                    className="form-control"
                    id={`email_${personId}`}
                    placeholder="email"
                    value={email}
                    onChange={(e) => handleChange( personId, "email", e)}
                />
                <button onClick={(e) => removePerson( personId, e )}>Remove People</button>
            </div> )
    }
};

Input.propTypes = {
    label: PropTypes.string.isRequired,
    personId: PropTypes.number.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    removePerson: PropTypes.func.isRequired,
};

export default Input;