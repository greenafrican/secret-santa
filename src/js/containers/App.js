import React, { Component, createRef } from "react";
import {
    Switch,
    Route
} from "react-router-dom";

import Setup from "./Setup";
import Accept from "./Accept";
import Status from "./Status";
import Optin from "./Optin";

import './app.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { position } = this.state;
        return (
            <div className="app-container">
                <Switch>
                    <Route exact path="/:campaign/">
                        <Setup />
                    </Route>
                    <Route path="/:campaign/status/:groupId">
                        <Status />
                    </Route>
                    <Route path="/:campaign/:groupId/accept/:memberId">
                        <Accept />
                    </Route>
                    <Route path="/:campaign/optin/:groupId">
                        <Optin />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;