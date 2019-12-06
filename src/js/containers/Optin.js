import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';

import { fetchOptInIfNeeded, postMember } from '../helpers/actions';
import Button from '../components/Button';
import Person from '../components/Person';

import './optin.scss';

class OptIn extends Component {

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
        this.setState({ opter: nextOpter });
    }

    componentDidMount(){
        const { groupId } = this.props.match.params;
        this.props.fetchOptInIfNeeded(groupId);
    }

    optIn(e) {
        e.preventDefault();
        const { groupId } = this.props.match.params;
        const opter = Object.assign({}, this.state.opter);
        this.props.postMember(groupId, opter).then(() =>
            this.props.history.push(`/status/${groupId}`)
        );
    }

    render() {
        const { opter } = this.state;
        const { people, spend } = this.props.data;
        if( 'undefined' === typeof people ) {
            return null;
        }
        const creator = people.find( d => d.creator === "true" ).name;
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

OptIn.propTypes = {
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    fetchOptInIfNeeded: PropTypes.func.isRequired,
    postMember: PropTypes.func.isRequired
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
        fetchOptInIfNeeded: (groupId) => dispatch(fetchOptInIfNeeded(groupId)),
        postMember: (groupId, memberId) => dispatch(postMember(groupId, memberId))
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(OptIn);
