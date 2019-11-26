import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import Input from "./Input";
import Button from "./Button";

class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            email: props.email
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.name !== nextState.name ||
            this.state.email !== nextState.email ||
            nextProps.name !== nextState.name ||
            nextProps.email !== nextState.email
        );
    }
    static getDerivedStateFromProps(nextProps) {
        return { name: nextProps.name, email: nextProps.email };
    }

    render() {
        const { className, personId, removePerson, type, updatePeople } = this.props;
        const { name, email } = this.state;
        return (
            <div className={classNames("form-group person", className)}>
                <Button
                    className={type === 'creator' ? 'creator-btn' : 'person-btn'}
                    action={(e) => type !== 'creator' && removePerson(personId, e)}
                    title="-"
                />
                <Input
                    className="name"
                    type="text"
                    id={`name_${personId}`}
                    name="name"
                    title={ type === 'creator' ? "Your Name" : "Name" }
                    value={name}
                    handleChange={(e) => updatePeople(personId, e)}
                />
                <Input
                    className="email"
                    type="email"
                    id={`email_${personId}`}
                    name="email"
                    title={ type === 'creator' ? "Your Email" : "Email" }
                    value={email}
                    handleChange={(e) => updatePeople(personId, e)}
                />
            </div>)
    }
};

Person.propTypes = {
    className: PropTypes.string,
    personId: PropTypes.number.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    updatePeople: PropTypes.func.isRequired,
    removePerson: PropTypes.func,
    type: PropTypes.string,
};

export default Person;