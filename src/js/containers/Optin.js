import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';

import { fetchGroupIfNeeded, postMember, fetchCampaignIfNeeded } from '../helpers/actions';
import Status from './Status';
import Button from '../components/Button';
import Person from '../components/Person';

import './optin.scss';

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
        this.setState({ opter: nextOpter });
    }

    componentDidMount() {
        const { groupId } = this.props.match.params;
        const { campaign } = this.props;
        this.props.fetchGroupIfNeeded(campaign.key, groupId);
    }

    optIn(e) {
        e.preventDefault();
        const { groupId } = this.props.match.params;
        const { campaign } = this.props;
        const opter = Object.assign({}, this.state.opter);
        this.props.postMember(campaign.key, groupId, opter).then(() =>
            this.props.history.push(`/accept/${groupId}`)
        );
    }

    render() {
        if (Object.keys(this.props.campaign).length === 0 && this.props.campaign.constructor === Object) {
            return null;
        }
        const { terms, optin, setup, title, external_link } = this.props.campaign;
        const { opter } = this.state;
        const { people, group } = this.props.data;
        if( 'undefined' === typeof people ) {
            return null;
        }
        const intros = setup.intro.map((d, i) => <p key={i}>{d}</p>);
        const creator = people.find(person => person.creator);
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
                    <Status
                        campaign={this.props.campaign}
                        people={people}
                    />
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

Optin.propTypes = {
    campaign: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    fetchGroupIfNeeded: PropTypes.func.isRequired,
    postMember: PropTypes.func.isRequired
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
        fetchGroupIfNeeded: (campaignName, groupId) => dispatch(fetchGroupIfNeeded(campaignName, groupId)),
        postMember: (campaignName, groupId, memberId) => dispatch(postMember(campaignName, groupId, memberId))
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Optin);
