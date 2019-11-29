import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import Button from '../components/Button';
import Person from '../components/Person';

import './optin.scss';

const getState = {
    "group": "Santas Little Elfs",
    "spend": 200,
    "people": [{
        "name": "Jeremy",
        "email": "jeremy@kin.me",
        "confirmed": true,
        "id": "c481056c-6cf9-4077-965a-5bf81d54a6f4",
        "creator": true,
        "buysFor": {
            "name": "Simphiwe",
            "email": "sim@kin.me",
            "confirmed": false,
            "id": "c56f173c-3025-478a-b28f-4ee3b6883f28"
        }
    }, {
        "name": "Simphiwe",
        "email": "sim@kin.me",
        "confirmed": false,
        "id": "c56f173c-3025-478a-b28f-4ee3b6883f28",
        "buysFor": {
            "name": "Hudson",
            "email": "hudson@kin.me",
            "confirmed": false,
            "id": "17a04f67-95bf-47e3-9d26-110ae021277f"
        }
    }, {
        "name": "Hudson",
        "email": "hudson@kin.me",
        "confirmed": false,
        "id": "17a04f67-95bf-47e3-9d26-110ae021277f",
        "buysFor": {
            "name": "Fassia",
            "email": "fass@kin.me",
            "confirmed": false,
            "id": "8d6b2e8c-b78e-4864-8776-034131b77def"
        }
    }, {
        "name": "Fassia",
        "email": "fass@kin.me",
        "confirmed": false,
        "id": "8d6b2e8c-b78e-4864-8776-034131b77def",
        "buysFor": {
            "name": "Christo",
            "email": "christo@kin.me",
            "confirmed": false,
            "id": "8ca01998-a648-4f16-95b3-559b4942ffe0"
        }
    }, {
        "name": "Christo",
        "email": "christo@kin.me",
        "confirmed": false,
        "id": "8ca01998-a648-4f16-95b3-559b4942ffe0",
        "buysFor": {
            "name": "Jeremy",
            "email": "jeremy@kin.me",
            "confirmed": true,
            "id": "c481056c-6cf9-4077-965a-5bf81d54a6f4",
            "creator": true
        }
    }],
    "optin": false,
    "group_id": "58ba72bd-dc50-418d-9bbe-0203ed083cdc"
};

class Optin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opter: {
                name: '',
                email: ''
            }
        };
        this.updateOpter = this.updateOpter.bind(this);
        this.optIn = this.optIn.bind(this);
    }

    updateOpter(id, e) {
        const nextOpter = Object.assign({}, this.state.opter, { [e.target.name]: e.target.value });
        this.setState({ opter: nextOpter }, () => this.props.updateSize());
    }

    componentDidMount(){
        // TODO: fetch data from api and add to state
        this.setState(Object.assign({}, getState, { id: this.props.match.params.id }), () => this.props.updateSize());
    }

    optIn(e) {
        e.preventDefault();

        const opter = Object.assign({}, this.state.opter, { confirmed: true, id: uuidv4() });
        const payload = JSON.stringify(
            Object.assign({},
                {
                    opter,
                    group_id: this.state.group_id
                }
            )
        );

        console.log(payload);

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

    render() {
        const { people, opter, spend } = this.state;
        if( 'undefined' === typeof people ) {
            return null;
        }
        const creator = people.find( d => d.creator === true ).name;
        const allTheCrew = people.map((person, id) =>
            (
                <div className="member" key={id}>
                    <span className="name">{person.name}</span>
                    <span className="confirmed">{person.confirmed}</span>
                </div>
            )
        );

        return (
            <div className="setup-container">
                <div className="intro">
                    <p>Ho Ho Hi!</p>
                    <p><span className="intro-creator">{creator}</span> started a Secret Santa group and wants you to join in the fun.</p>
                    <p>Gifts are capped at <span className="intro-creator">R{spend}</span> per person and the cut-off date to join in is 15 December ’19.</p>
                    <p>Simply submit your name and email address to join <span className="intro-creator">{creator}'s</span> merry band of Secret Santas.</p>
                </div>
                <div className="people">
                    <Person
                        className="creator"
                        type="creator"
                        name={opter.name}
                        email={opter.email}
                        personId={0}
                        updatePerson={this.updateOpter}
                    />
                </div>
                <div className="go sign-me-up">
                    <Button action={this.optIn} title="Sign me up!" />
                </div>
                <div className="crew">
                    <span className="crew-title">The crew so far:</span>
                    {allTheCrew}
                </div>
            </div>
        );
    }
}

export default withRouter(Optin);
