import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';

import { acceptOptIn } from '../helpers/actions';
import Button from '../components/Button';
import YoureIn from '../images/youre_in.png';

import './accept.scss';

class Accept extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        const { groupId, memberId } = this.props.match.params;
        this.props.acceptOptIn(groupId, memberId);
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

Accept.propTypes = {
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    acceptOptIn: PropTypes.func.isRequired
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
        acceptOptIn: (groupId, memberId) => dispatch(acceptOptIn(groupId, memberId))
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Accept);
