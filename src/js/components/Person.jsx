import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";

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
            <div className="form-group" style={myStyle}>
                <Input
                    type="text"
                    id={`name_${personId}`}
                    name="name"
                    placeholder="name"
                    value={name}
                    handleChange={(e) => updatePeople(personId, e)}
                />
                <Input
                    type="email"
                    id={`email_${personId}`}
                    name="email"
                    placeholder="email"
                    value={email}
                    handleChange={(e) => updatePeople(personId, e)}
                />
                <button onClick={(e) => removePerson(personId, e)}>Remove Person</button>
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