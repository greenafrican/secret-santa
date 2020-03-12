import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';

import { postGroup, fetchCampaignIfNeeded } from '../helpers/actions';
import Textarea from '../components/Textarea';
import Input from '../components/Input';
import Button from '../components/Button';
import Person from '../components/Person';
import './setup.scss';

const originalState = {
    group: '',
    message: '',
    creator: {
        name: '',
        email: ''
    },
    people: [
        {
            name: '',
            email: '',
            state: 'unclear',
            creator: false
        }
    ]
};

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, originalState,  {
            group: props.campaign.setup.form_custom_fields.find(d => d.key === 'group').default || '',
        });
        this.handleInput = this.handleInput.bind(this);
        this.updatePerson = this.updatePerson.bind(this);
        this.updateCreator = this.updateCreator.bind(this);
        this.addPeople = this.addPeople.bind(this);
        this.removePerson = this.removePerson.bind(this);
        this.go = this.go.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleDate = this.handleDate.bind(this);
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

    go(e) {
        //TODO: email validation
        e.preventDefault();
        const state = Object.assign({}, this.state);
        const { campaign } = this.props;
        const { group } = state;
        const people = this.state.people.filter(d => (
            d.name !== '' && d.email !== ''
        ));

        const creator = Object.assign({}, this.state.creator, {creator: true});
        people.push(creator);

        const payload = Object.assign({},
            {
                group,
                properties: {},
                people
            }
        );
        this.props.postGroup(payload, campaign.key);
    }

    handleClearForm() {
        e.preventDefault();
        this.setState(Object.assign({}, originalState));
    }

    render() {
        if (Object.keys(this.props.campaign).length === 0 && this.props.campaign.constructor === Object) {
            return null;
        }
        const { creator, group, people, message } = this.state;
        const { external_link, title, setup, terms } = this.props.campaign;
        const intros = setup.intro.map( (d,i) => <p key={i}>{d}</p>);
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
                <div className="intro-container">
                    <div className="logo"></div>
                    <span className="title">{title}</span>
                    <span className="intro">{intros}</span>
                    <div className="campaign-link">
                        <Button action={() => window.open(external_link, " _blank")} title="Check it out" />
                    </div>
                </div>
                <div className="title form-title">{setup.form_title}</div>
                <div className="form-container">
                    <Person
                        className="creator"
                        type="creator"
                        name={creator.name}
                        email={creator.email}
                        personId={0}
                        updatePerson={this.updateCreator}
                    />
                    <Input
                        className="group"
                        name="group"
                        type="text"
                        value={group || setup.form_custom_fields.find(d => d.key === 'group').default}
                        handleChange={this.handleInput}
                        title="This group is called:"
                    />
                    <Textarea
                        className="message"
                        name="message"
                        type="text-area"
                        value={message}
                        handleChange={this.handleInput}
                        title="Message to group:"
                    />
                    <div className="people">
                        <div>
                            <span className="people-title">Who's invited:</span>
                            {allThePeople}
                        </div>
                    </div>
                </div>
                <div className="go">
                    <Button action={this.go} title="Let's do this!" />
                </div>
                <div className="terms"><a href={terms} target="_blank">
                    By opting in you’re agreeing to our terms & conditions</a>
                </div>
            </div>
        );
    }
}

Setup.propTypes = {
    campaign: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    postGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { dataByGroupId } = state;
    return {
        data: dataByGroupId['data'] || {},
        isFetching: dataByGroupId['isFetching'] || true,
        lastUpdated: dataByGroupId['lastUpdated']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postGroup: (group, campaignName) => dispatch(postGroup(group, campaignName))
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Setup);
