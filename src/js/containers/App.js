import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import {
    Switch,
    Route
} from "react-router-dom";
import { connect } from 'react-redux';
import {
    fetchOptInIfNeeded
} from '../helpers/actions';

import Setup from "./Setup";
import Status from "./Status";
import Optin from "./Optin";
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
        this.props.fetchOptInIfNeeded('4fc7680a-be85-493c-bc2b-ed5ecc40ead2');
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
        console.log(this.props);
        return (
            <div className="app-container" ref={this.appRef}>
                <Switch>
                    <Route exact path="/">
                        <Setup updateSize={this.updateSize} />
                        {position && <Icons position={position} />}
                    </Route>
                    <Route path="/status/:groupId">
                        <Status updateSize={this.updateSize} />
                        {position && <Icons position={Object.assign({}, position, { height: position.height + 220 })} />}
                    </Route>
                    <Route path="/optin/:groupId">
                        <Optin updateSize={this.updateSize} />
                        {position && <Icons position={Object.assign({}, position, { height: position.height + 220 })} />}
                    </Route>
                </Switch>
            </div>
        );
    }
}

App.propTypes = {
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    fetchOptInIfNeeded: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { dataByOptInId } = state;

    console.log(dataByOptInId.data || {})

    return {
        data: dataByOptInId.data || {},
        isFetching: dataByOptInId.isFetching || true,
        lastUpdated: dataByOptInId.lastUpdated || null
    }
}

const MapDispatchToProps = dispatch => {
    return {
        fetchOptInIfNeeded: (id) => dispatch(fetchOptInIfNeeded(id))
    }
};

export default connect(mapStateToProps, MapDispatchToProps)(App)