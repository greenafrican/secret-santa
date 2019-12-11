import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import Input from "./Input";
import Button from "./Button";

import './person.scss';
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
            nextProps.email !== nextState.email ||
            nextProps.lastPerson !== this.props.lastPerson
        );
    }
    static getDerivedStateFromProps(nextProps) {
        return { name: nextProps.name, email: nextProps.email };
    }

    render() {
        const { addPeople, className, personId, lastPerson, removePerson, type, updatePerson } = this.props;
        const { name, email } = this.state;
        const windowWidth = window.innerWidth;
        const addPerson = (lastPerson === true && type !== 'creator')
            ? <Button className="add-people" action={() => addPeople(1)} title="+" />
            : null;
        const buttons = type !== 'creator' ? (
            <div className="person-buttons">
                <Button
                    className={type === 'creator' || personId === 0 ? 'creator-btn' : 'remove-person'}
                    action={(e) => (type !== 'creator' && personId > 0) && removePerson(personId, e)}
                title="-" />
                { addPerson }
            </div> )
            : null;
        return (
            <div className={classNames("form-group person", className)}>
                { windowWidth > 768 && buttons }
                <Input
                    className="name"
                    type="text"
                    id={`name_${personId}`}
                    name="name"
                    title={ type === 'creator' ? "My name is" : "Name" }
                    value={name}
                    handleChange={(e) => updatePerson(personId, e)}
                />
                <Input
                    className="email"
                    type="email"
                    id={`email_${personId}`}
                    name="email"
                    title={ type === 'creator' ? "My email" : "Email" }
                    value={email}
                    handleChange={(e) => updatePerson(personId, e)}
                />
                { (windowWidth <= 768 && personId > 0) ? buttons : 
                    <div className="person-buttons">
                        {addPerson}
                    </div> }
            </div>)
    }
};

Person.propTypes = {
    addPeople: PropTypes.func,
    className: PropTypes.string,
    personId: PropTypes.number.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    lastPerson: PropTypes.bool,
    updatePerson: PropTypes.func.isRequired,
    removePerson: PropTypes.func,
    type: PropTypes.string,
};

export default Person;