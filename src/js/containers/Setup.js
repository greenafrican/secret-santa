import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Input from '../components/Input';
import Button from '../components/Button';
import Person from '../components/Person';
import Swiper from '../components/Swiper';
import './setup.scss';

const originalState = {
    group: '',
    spend: 200.00,
    creator: {
        name: '',
        email: ''
    },
    people: [
        {
            name: '',
            email: ''
        }
    ],
    optin: false,
    cutoff: new Date()
};

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, originalState);
        this.handleInput = this.handleInput.bind(this);
        this.handleSwipe = this.handleSwipe.bind(this);
        this.updatePerson = this.updatePerson.bind(this);
        this.updateCreator = this.updateCreator.bind(this);
        this.addPeople = this.addPeople.bind(this);
        this.removePerson = this.removePerson.bind(this);
        this.copyLink = this.copyLink.bind(this);
        this.secretShuffle = this.secretShuffle.bind(this);
        this.go = this.go.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleDate = this.handleDate.bind(this);
    }

    componentDidMount() {
        const datePickers = document.getElementsByClassName("react-datepicker__input-container");
        Array.from(datePickers).forEach((el => el.childNodes[0].setAttribute("readOnly", true)))
    }

    addPeople(n) {
        const newPeople = Array(n).fill({ name: '', email: '' });
        this.setState({ people: [...this.state.people, ...newPeople] });
    }

    handleDate(date) {

        this.setState({
            cutoff: date
        });
    }

    removePerson(i) {
        const nextPeople = [...this.state.people];
        nextPeople.splice(i, 1);
        this.setState({ people: nextPeople });
    }

    updateCreator(id, e) {
        const nextCreator = Object.assign({}, this.state.creator, { [e.target.name]: e.target.value });
        this.setState({ creator: nextCreator });
    }

    updatePerson(id, e) {
        const nextPeople = [...this.state.people];
        nextPeople[id] = Object.assign({}, nextPeople[id], { [e.target.name]: e.target.value });
        this.setState({ people: nextPeople });
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSwipe(e) {
        this.setState({ optin: !this.state.optin });
    }

    // we shuffle all the people and then everyone buys for the person next to them :)
    secretShuffle( array ) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array.map((d, i) => (
            Object.assign({}, d, {
                buys_for: i === (array.length - 1) ? array[0] : array[i + 1]
            })
        ));;
    }

    copyLink() {
        // TODO: post group with group_id
        const str = uuidv4();
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    go(e) {
        const state = Object.assign({}, this.state);
        e.preventDefault();
        let people = this.state.people.filter(d => (
            d.name !== '' && d.email !== ''
        ));

        const creator = Object.assign({}, this.state.creator, {confirmed: true, id: uuidv4(), creator: true});
        people = people.map( d => (
            Object.assign({}, d, {confirmed: false, id: uuidv4()})
        ) );
        people.push(creator);
        delete state.creator;

        people = this.secretShuffle( people );

        const payload = JSON.stringify(
            Object.assign(state,
                {
                    people,
                    group_id: uuidv4()
                }
            )
        );

        console.log(payload);

        console.log(people);

        // fetch('http://example.com', {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        // }).then(() =>
            this.props.history.push('/status/12345')
        // );
    }

    handleClearForm() {
        e.preventDefault();
        this.setState(Object.assign({}, originalState));
    }

    render() {
        const { creator, cutoff, group, people, optin, spend } = this.state;
        const allThePeople = people.map((person, id) =>
            (
                <Person
                    addPeople={this.addPeople}
                    name={person.name}
                    email={person.email}
                    personId={id}
                    key={id}
                    updatePerson={this.updatePerson}
                    removePerson={this.removePerson}
                    lastPerson={ ( id === ( people.length - 1 ) )}
                />
            )
        );
        return (
            <div className="setup-container">
                <Input
                    className="group"
                    name="group"
                    type="text"
                    value={group}
                    handleChange={this.handleInput}
                    title="Group name:"
                />
                <Input
                    className="spend"
                    name="spend"
                    type="text"
                    value={spend}
                    handleChange={this.handleInput}
                    title="Amount per person"
                />
                <div className="people">
                    <Person
                        className="creator"
                        type="creator"
                        name={creator.name}
                        email={creator.email}
                        personId={0}
                        updatePerson={this.updateCreator}
                    />
                    { ! optin && 
                        <div>
                            <span className="people-title">Add others:</span>
                            {allThePeople}
                        </div>
                    }
                </div>
                { ! optin && <div className="go">
                    <Button action={this.go} title="Let's do this!" />
                </div>}
                { optin &&
                <div className="cutoff">
                    <div className="form-group">
                        <label htmlFor="cutoff" className="form-label">Opt in cutoff date:</label>
                        <DatePicker
                            selected={cutoff}
                            onChange={this.handleDate}
                            withPortal
                        />
                    </div>
                    <div className="go">
                        <Button action={this.copyLink} title="Copy link!" />
                    </div>
                </div>}
            </div>
        );
    }
}

export default withRouter(Setup);
