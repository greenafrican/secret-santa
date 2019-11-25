import React, { Component, createRef } from "react";
import ReactDOM from "react-dom"; import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Setup from "./Setup";
import Status from "./Status";
import Icons from "../components/Icons";

import './app.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.appRef = createRef();
        this.state = {};
        this.updateSize = this.updateSize.bind(this);
    }

    componentDidMount() {
        this.updateSize();
    }

    updateSize() {
        const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = this.appRef.current;
        const position = {
            left: offsetLeft,
            top: offsetTop,
            width: offsetWidth,
            height: offsetHeight
        };
        this.setState({ position })
    }

    render() {
        const { position } = this.state;
        console.log(position);
        return (
            <div className="app-container" ref={this.appRef}>
                <Switch>
                    <Route exact path="/">
                        <Setup updateSize={this.updateSize} />
                    </Route>
                    <Route path="/status/:id">
                        <Status updateSize={this.updateSize} />
                    </Route>
                </Switch>
                { position && <Icons position={Object.assign({}, position, {height: position.height+220})} />}
            </div>
        );
    }
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);