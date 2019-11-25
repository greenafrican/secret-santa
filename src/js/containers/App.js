import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Input from '../components/Input';
import Button from '../components/Button';
import Person from '../components/Person';

import './styles.scss';

const originalState = {
    group: '',
    spend: 200.00,
    people: [
        {
            name: '',
            email: ''
        }
    ]
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, originalState);
        this.handleInput = this.handleInput.bind(this);
        this.updatePeople = this.updatePeople.bind(this);
        this.addPeople = this.addPeople.bind(this);
        this.removePerson = this.removePerson.bind(this);
        this.go = this.go.bind(this);
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

    handleInput(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    go() {
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
        const { group, people, spend } = this.state;
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
            <div className="app-container">
                <Input
                    name="group"
                    type="text"
                    value={group}
                    handleChange={this.handleInput}
                    title="This secret Santa group is called"
                />
                <Input
                    name="spend"
                    type="text"
                    value={spend}
                    handleChange={this.handleInput}
                    title="Amount per person"
                />
                <div className="people">
                    <span className="people-title">Add People:</span>
                    {allThePeople}
                    <div className="add-people">
                        <Button action={() => this.addPeople(1)} title="+1" />
                        <Button action={() => this.addPeople(5)} title="+5" />
                    </div>
                </div>
                <div className="go">
                    <Button action={this.go} title="Let's do this!" />
                </div>
            </div>
        );
    }
}

export default App;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;