import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import Button from "./Button";

class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            email: props.email
        };
        // this.handleChange = this.handleChange.bind(this);
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
        const { personId, removePerson, updatePeople } = this.props;
        const { name, email } = this.state; const myStyle = {
            'display': 'flex',
            'flexWrap': 'wrap',
            'justifyContent': 'space-between'
        };
        return (
            <div className="form-group person" style={myStyle}>
                <Input
                    className="name"
                    type="text"
                    id={`name_${personId}`}
                    name="name"
                    title="Name"
                    value={name}
                    handleChange={(e) => updatePeople(personId, e)}
                />
                <Input
                    className="email"
                    type="email"
                    id={`email_${personId}`}
                    name="email"
                    title="Email"
                    value={email}
                    handleChange={(e) => updatePeople(personId, e)}
                />
                <Button action={(e) => removePerson(personId, e)} title="-" />
            </div>)
    }
};

Person.propTypes = {
    personId: PropTypes.number.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    updatePeople: PropTypes.func.isRequired,
    removePerson: PropTypes.func.isRequired,
};

export default Person;