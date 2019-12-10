import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { postOptIn } from '../helpers/actions';
import Input from '../components/Input';
import Button from '../components/Button';
import Person from '../components/Person';
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
        e.preventDefault();
        const state = Object.assign({}, this.state);
        const { group, spend } = state;
        const people = this.state.people.filter(d => (
            d.name !== '' && d.email !== ''
        ));
        const creator = Object.assign({}, this.state.creator, {creator: true});
        people.push(creator);

        const payload = JSON.stringify(
            Object.assign({},
                {
                    cutoff: '2019-12-12',
                    group,
                    spend,
                    optin: true,
                    people
                }
            )
        );
        console.log(payload);
        this.props.postOptIn(payload);
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

Setup.propTypes = {
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    postOptIn: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { dataByOptInId } = state;
    return {
        data: dataByOptInId['data'] || {},
        isFetching: dataByOptInId['isFetching'] || true,
        lastUpdated: dataByOptInId['lastUpdated']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postOptIn: (optin) => dispatch(postOptIn(optin))
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Setup);
