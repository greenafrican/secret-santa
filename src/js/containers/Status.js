import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';

import { fetchOptInIfNeeded } from '../helpers/actions';
import YoureIn from '../images/youre_in.png';

import './accept.scss';

class Status extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const { groupId } = this.props.match.params;
        this.props.fetchOptInIfNeeded(groupId);
    }

    render() {
        const { people } = this.props.data;
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
            </div>
        );
    }
}

Status.propTypes = {
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    fetchOptInIfNeeded: PropTypes.func.isRequired
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
        fetchOptInIfNeeded: (groupId) => dispatch(fetchOptInIfNeeded(groupId))
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Status);
