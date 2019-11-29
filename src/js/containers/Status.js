import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../components/Button';
import YoureIn from '../images/youre_in.png';

import './status.scss';

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

class Status extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        // TODO: fetch data from api and add to state
        this.setState(Object.assign({}, getState, {groupId: this.props.match.params.groupId}));
    }

    render() {
        const { people } = this.state;
        if( 'undefined' === typeof people ) {
            return null;
        }
        const allTheCrew = people.map((person, id) =>
            (
                <div className="member" key={id}>
                    <span className="name">{person.name}</span>
                    <span className="confirmed">{person.confirmed}</span>
                </div>
            )
        );
        return (
            <div>
                <img className="header" src={YoureIn} />
                <div className="crew">
                    <span className="crew-title">The crew so far:</span>
                    {allTheCrew}
                </div>
                <div className="go">
                    <Button action={this.copyLink} title="Copy link!" />
                </div>
            </div>
        );
    }
}

export default withRouter(Status);
