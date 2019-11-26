import React, { Component, createRef } from 'react';

import Ball from '../images/ball.png';
import Candy from '../images/candy.png';
import Hat from '../images/hat.png';
import Snowflake from '../images/snowflake.png';
import Stocking from '../images/stocking.png';
import Tree from '../images/tree.png';

import './icons.scss';

const randomPos = (x, y) => {
    return {
        top: `${y}px`,
        left: `${x}px`,
        position: 'absolute',
    };
}

class Icons extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { position } = this.props;
        if ( ! position ) {
            return null;
        }
        
        const windowWidth = window.innerWidth;
        let adjM = windowWidth > 768 ? 120 : 0;
        let adjL = windowWidth > 768 ? 240 : 0;
        let adjS = windowWidth > 768 ? 80 : 0;

        const { left, top, width, height } = position;
        const posBall = randomPos(left - adjM, top - adjM);
        const posTree = randomPos(left + width - adjM, top - adjM);
        const posHat = randomPos(left - adjL, top + height / 2 - adjM);
        const posSnowflake = randomPos(left + width + 30, top + height / 2);
        const posStocking = randomPos(left - adjM, top + height-adjM);
        const posCandy = randomPos(left + width - adjS, top + height);

        return (
            <div className="icons" ref={this.iconRef}>
                <img className="ball" src={Ball} style={posBall} />
                <img className="tree" src={Tree} style={posTree} />
                <img className="candy" src={Candy} style={posCandy} />
                <img className="hat" src={Hat} style={posHat} />
                <img className="snowflake" src={Snowflake} style={posSnowflake} />
                <img className="stocking" src={Stocking} style={posStocking} />
            </div>
        )
    }
}

export default Icons;
