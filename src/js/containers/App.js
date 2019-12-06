import React, { Component, createRef } from "react";
import {
    Switch,
    Route
} from "react-router-dom";

import Setup from "./Setup";
import Accept from "./Accept";
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
                    <Route exact path="/">
                        <Setup />
                    </Route>
                    <Route path="/:groupId/accept/:memberId">
                        <Accept />
                    </Route>
                    <Route path="/optin/:groupId">
                        <Optin />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;