import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "./Input_old";

class Setup extends Component {
    constructor() {
        super();
        const people = [
            {
                name: '',
                email: ''
            }
        ];
        this.state = {
            groupName: '',
            people
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
        this.addPerson = this.addPerson.bind(this);
        this.addPeople = this.addPeople.bind(this);
        this.removePerson = this.removePerson.bind(this);
    }
    addPeople() {
        const newPeople = Array(5).fill({name:'', email:''});
        console.log(newPeople);
        this.setState({ people: [...this.state.people, ...newPeople]});
    }
    addPerson() {
        const copyPerson = Object.assign({}, { name: '', email: '' });
        const newPeople = [...this.state.people];
        newPeople.push(copyPerson);
        this.setState({ people: newPeople });
    }
    handleChange(personId, param, event) {
        const nextPeople = [...this.state.people ];
        nextPeople[personId][param] = event.target.value;
        this.setState({ people: nextPeople });
    }
    handleGroupNameChange(event) {
        this.setState({ groupName: event.target.value });
    }
    removePerson(personId, event) {
        const nextPeople = [...this.state.people];
        nextPeople.splice(personId, 1);
        this.setState({ people: nextPeople });
    }
    render() {
        console.log(this.state);
        const { groupName, people } = this.state;

        const myStyle = {
            'display': 'flex',
            'flexWrap': 'wrap',
            'justifyContent': 'space-between'
        };

        const peopleRanges = people.map( ( person, i ) => (
            <Input
                label={""}
                personId={i}
                key={i.toString()}
                name={person.name}
                email={person.email}
                handleChange={this.handleChange}
                removePerson={this.removePerson}
            />
        ) );
        
        return (
            <div>
                <input
                    type="text"
                    className="form-control"
                    id={`groupName`}
                    defaultValue="group name"
                    value={groupName}
                    onChange={this.handleGroupNameChange}
                />
                { peopleRanges.map( ( person, i ) => ( <div style={myStyle} key={i}>{ person }</div> ) ) }
                <button onClick={this.addPerson}>Add Person</button>
                <button onClick={this.addPeople}>Add People</button>
            </div>
        );
    }
}
export default Setup;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Setup />, wrapper) : false;