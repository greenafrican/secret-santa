import React, { Component } from "react";
import {
    Switch,
    Route
} from "react-router-dom";

import Campaign from "./Campaign";
import './app.scss';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-container">
                <Switch>
                    <Route exact path="/:campaign">
                        <Campaign />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;