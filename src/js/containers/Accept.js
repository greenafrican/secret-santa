import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';

import { acceptGroup, fetchGroupIfNeeded } from '../helpers/actions';
import Status from './Status';
import Button from '../components/Button';

import './accept.scss';

class Accept extends Component {

    constructor(props) {
        super(props);
        this.copyLink = this.copyLink.bind(this);
    }

    componentDidMount() {
        const { groupId, memberId } = this.props.match.params;
        const { campaign } = this.props;
        this.props.fetchGroupIfNeeded(campaign.key, groupId);
        // this.props.acceptGroup(campaign.key, groupId, memberId);
    }

    copyLink(groupId) {
        const el = document.createElement('textarea');
        let hostName = window.location.hostname;
        hostName = hostName === '0.0.0.0' ? hostName + ':8080' : hostname;
        el.value = `${hostName}/${this.props.campaign.key}/optin/${groupId}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    render() {
        if (Object.keys(this.props.campaign).length === 0 && this.props.campaign.constructor === Object) {
            return null;
        }
        const { status } = this.props.campaign;
        const { people, group, group_id } = this.props.data;
        if ('undefined' === typeof people) {
            return null;
        }
        const creator = people.find(person => person.creator);
        return (
            <div className="status-container">
                <div className="sudo-form-container">
                    <div className="yourein"></div>
                    <div className="intro">
                        {status.intro.map((d, i) => {
                            return (<p key={i}>{
                                d
                                    .replace('{creator_name}', creator.name)
                                    .replace('{group_name}', group)
                            }</p>);
                        })}
                    </div>
                    <Status
                        campaign={this.props.campaign}
                        people={people}
                        />
                    <div className="status-text">
                        <p>{status.invite}</p>
                    </div>
                    <div className="go">
                        <Button action={() => this.copyLink(group_id)} title="Copy the link" />
                    </div>
                </div>
            </div>
        );
    }
}

Accept.propTypes = {
    campaign: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    acceptGroup: PropTypes.func.isRequired,
    fetchGroupIfNeeded: PropTypes.func.isRequired
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
        acceptGroup: (campaignName, groupId, memberId) => dispatch(acceptGroup(campaignName, groupId, memberId)),
        fetchGroupIfNeeded: (campaignName, groupId) => dispatch(fetchGroupIfNeeded(campaignName, groupId))
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Accept);
