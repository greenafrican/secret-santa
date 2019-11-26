import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../components/Button';
import YoureIn from '../images/youre_in.png';

import './status.scss';

const getState = {
    group: "Bobby's Buddies",
    spend: 200.00,
    creator: {
        name: 'Robert',
        email: 'robert@kin.me'
    },
    people: [
        {
            name: 'Jenfer Jacobs',
            email: 'jj@kin.me',
            confirmed: true
        }, ,
        {
            name: 'Simphiwe',
            email: 'simphiwe.mahlangu@kin.me',
            confirmed: true
        },
        {
            name: 'Barbara',
            email: 'barbs@kin.me',
            confirmed: false
        }
    ]
};

class Status extends Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, getState);
    }

    componentDidMount(){
        this.setState( Object.assign({}, this.state ), () => this.props.updateSize());
    }

    render() {
        const { creator, group, people, spend } = this.state;
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
