import React, { Component } from "react";
import {
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux';

import { fetchCampaignIfNeeded } from '../helpers/actions';
import Setup from "./Setup";
import Accept from "./Accept";
import Group from "./Optin";

class Campaign extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCampaignIfNeeded(this.props.match.params.campaign);
    }

    render() {
        if (Object.keys(this.props.campaign).length === 0 && this.props.campaign.constructor === Object) {
            return null;
        }
        const { campaign } = this.props;
        const { path } = this.props.match;
        
        // hack to set body background above root component
        document.body.style.backgroundColor = this.props.campaign.background_color;

        return (
            <div className="campaign-container">
                <div className="logo"></div>
                <Switch>
                    <Route exact path={`${path}/`}>
                        <Setup campaign={campaign} />
                    </Route>
                    <Route path={`${path}/:groupId/accept/:memberId`}>
                        <Accept campaign={campaign} />
                    </Route>
                    <Route path={`${path}/optin/:groupId`}>
                        <Group campaign={campaign} />
                    </Route>
                </Switch>
            </div>
        );
    }
}


Campaign.propTypes = {
    campaign: PropTypes.object.isRequired,
    fetchCampaignIfNeeded: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { campaignByCampaignName } = state;
    return {
        campaign: campaignByCampaignName['campaign'] || {}
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCampaignIfNeeded: (campaignName) => dispatch(fetchCampaignIfNeeded(campaignName))
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Campaign);