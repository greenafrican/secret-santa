import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';

import { fetchOptInIfNeeded, getCampaign } from '../helpers/actions';
import Tick from '../images/tick.svg'
import Button from '../components/Button';

import './accept.scss';

class Status extends Component {

    constructor(props) {
        super(props);
        this.copyLink = this.copyLink.bind(this);
    }

    componentDidMount(){
        const { campaign, groupId } = this.props.match.params;
        this.props.getCampaign(campaign);
        this.props.fetchOptInIfNeeded(groupId);
    }

    copyLink(groupId) {
        // TODO: post group with group_id
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
        const { status, cutoff } = this.props.campaign;
        const { people, group, group_id } = this.props.data;
        if( 'undefined' === typeof people ) {
            return null;
        }
        const creator = people.find(person => person.creator);
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
            <div className="status-container">
                <div className="sudo-form-container">
                    <div className="yourein"></div>
                    <div className="intro">
                        { status.intro.map((d,i) => {
                            return (<p key={i}>{
                                d
                                    .replace('{creator_name}', creator.name)
                                    .replace('{group_name}', group)
                            }</p>);
                        })}
                    </div>
                    <div className="crew">
                        <span className="crew-title">The crew so far:</span>
                        {allTheCrew}
                    </div>
                    <div className="status-text">
                        <p>{cutoff.status_text.replace('{goal_difference}', parseInt(cutoff.goal) - people.length)}</p>
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

Status.propTypes = {
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    fetchOptInIfNeeded: PropTypes.func.isRequired,
    getCampaign: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { dataByOptInId, campaignByCampaignName } = state;
    return {
        campaign: campaignByCampaignName['campaign'] || {},
        data: dataByOptInId['data'] || {},
        isFetching: dataByOptInId['isFetching'] || true,
        lastUpdated: dataByOptInId['lastUpdated']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOptInIfNeeded: (groupId) => dispatch(fetchOptInIfNeeded(groupId)),
        getCampaign: (campaign) => dispatch(getCampaign(campaign))
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Status);
