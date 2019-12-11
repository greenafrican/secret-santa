import React, { Component } from 'react';
import PropTypes from "prop-types";
import Tick from '../images/tick.svg'

import './status.scss';

class Status extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { campaign, people } = this.props;
        if( 'undefined' === typeof people ) {
            return null;
        }
        const { cutoff } = campaign;
        const allTheCrew = people.map((person, id) =>
            (
                <div className="member" key={id}>
                    <span className="name">{person.name}</span>
                    <span className="confirmed">
                        {person.state === 'in' &&
                            <Tick width={20} height={20} viewBox="0 0 594.149 594.149" />
                        }
                    </span>
                </div>
            )
        );
        return (
            <div className="status">
                <div className="crew">
                    <span className="crew-title">The crew so far:</span>
                    {allTheCrew}
                </div>
                <div className="status-text">
                    <p>{cutoff.status_text.replace('{goal_difference}', parseInt(cutoff.goal) - people.length)}</p>
                </div>
            </div>
        );
    }
}

Status.propTypes = {
    campaign: PropTypes.object.isRequired,
    people: PropTypes.array.isRequired
};

export default Status;
