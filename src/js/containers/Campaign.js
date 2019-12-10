import React, { Component } from "react";
import {
    Switch,
    Route,
    withRouter
} from "react-router-dom";

import Setup from "./Setup";
import Accept from "./Accept";
import Status from "./Status";
import Optin from "./Optin";

class Campaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaign: props.match.params.campaign
        };
    }

    render() {
        const { path } = this.props.match;
        return (
            <div className="campaign-container">
                <div className="logo"></div>
                <Switch>
                    <Route exact path={`${path}/`}>
                        <Setup />
                    </Route>
                    <Route path={`${path}/status/:groupId`}>
                        <Status />
                    </Route>
                    <Route path={`${path}/:groupId/accept/:memberId`}>
                        <Accept />
                    </Route>
                    <Route path={`${path}/optin/:groupId`}>
                        <Optin />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(Campaign);