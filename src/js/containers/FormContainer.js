import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Input from '../components/Input';
import Button from '../components/Button';
import Person from '../components/Person';

const originalState = {
    group: '',
    people: [
        {
            name: '',
            email: ''
        }
    ]
};

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, originalState);
        this.updateGroup = this.updateGroup.bind(this);
        this.updatePeople = this.updatePeople.bind(this);
        this.addPeople = this.addPeople.bind(this);
        this.removePerson = this.removePerson.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }

    addPeople(n) {
        const newPeople = Array(n).fill({ name: '', email: '' });
        this.setState({people: [ ...this.state.people, ...newPeople ]});
    }

    removePerson(i) {
        const nextPeople = [ ...this.state.people ];
        nextPeople.splice(i, 1);
        this.setState({people: nextPeople});
    }

    updatePeople(id, e) {
        const nextPeople = [ ...this.state.people ];
        nextPeople[id] = Object.assign({}, nextPeople[id], {[e.target.name]: e.target.value});
        this.setState({people: nextPeople});
    }

    updateGroup(e) {
        this.setState({group: e.target.value});
    }

    handleFormSubmit() {
        e.preventDefault();

        // fetch('http://example.com', {
        //     method: "POST",
        //     body: JSON.stringify(userData),
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        // }).then(response => {
        //     response.json().then(data => {
        //         console.log("Successful" + data);
        //     })
        // })
    }

    handleClearForm() {
        e.preventDefault();
        this.setState(Object.assign({}, originalState));
    }
    
    render() {
        const { group, people } = this.state;
        const allThePeople = people.map( (person, id) =>
            (
                <Person
                    name={person.name}
                    email={person.email}
                    personId={id}
                    key={id}
                    updatePeople={this.updatePeople}
                    removePerson={this.removePerson}
                />
            )
        );
        return (
            <div>
                <Input
                    name="group"
                    type="text"
                    value={group}
                    handleChange={this.updateGroup}
                    placeholder="Group Name"
                />
                { allThePeople }
                <Button action={() => this.addPeople(1)} title="Add Person" />
                <Button action={() => this.addPeople(5)} title="Add People" />
            </div>
        );
    }
}

export default FormContainer;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;