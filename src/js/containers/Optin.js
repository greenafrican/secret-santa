import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';

import { fetchOptInIfNeeded, postMember, getCampaign } from '../helpers/actions';
import Tick from '../images/tick.svg'
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

    componentDidMount() {
        const { campaign, groupId } = this.props.match.params;
        this.props.getCampaign(campaign);
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
        if (Object.keys(this.props.campaign).length === 0 && this.props.campaign.constructor === Object) {
            return null;
        }
        const { terms, cutoff, optin, setup, title, external_link } = this.props.campaign;
        const { opter } = this.state;
        const { people, group } = this.props.data;
        if( 'undefined' === typeof people ) {
            return null;
        }
        const intros = setup.intro.map((d, i) => <p key={i}>{d}</p>);
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
            <div className="optin-container">
                <div className="sudo-form-container">
                    <div className="intro">
                        {optin.intro.map((d, i) => {
                            return (<p key={i}>{
                                d
                                    .replace('{creator_name}', creator.name)
                                    .replace('{group_name}', group)
                            }</p>);
                        })}
                    </div>

                    <div className="form-container">
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
                            <Button action={this.optIn} title="I'm in!" />
                        </div>
                        <div className="terms"><a href={terms} target="_blank">
                            By opting in you’re agreeing to our terms & conditions</a>
                        </div>
                    </div>
                    <div className="crew">
                        <span className="crew-title">The crew so far:</span>
                        {allTheCrew}
                    </div>
                    <div className="status-text">
                        <p>{cutoff.status_text.replace('{goal_difference}', parseInt(cutoff.goal) - people.length)}</p>
                    </div>
                </div>
                <div className="intro-container">
                    <span className="title">{title}</span>
                    <span className="intro">{intros}</span>
                    <div className="campaign-link">
                        <Button action={() => window.open(external_link, " _blank")} title="Check it out" />
                    </div>
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
    postMember: PropTypes.func.isRequired,
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
        postMember: (groupId, memberId) => dispatch(postMember(groupId, memberId)),
        getCampaign: (campaign) => dispatch(getCampaign(campaign))
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(OptIn);
