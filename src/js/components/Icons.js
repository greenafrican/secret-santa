import React, { Component, createRef } from 'react';

import Ball from '../images/ball.png';
import Candy from '../images/candy.png';
import Hat from '../images/hat.png';
import Snowflake from '../images/snowflake.png';
import Stocking from '../images/stocking.png';
import Tree from '../images/tree.png';

import './icons.scss';

const setPos = (x, y, width=200) => {
    return {
        top: `${y}px`,
        left: `${x}px`,
        position: 'absolute',
        width: `${width}px`
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
        const { left, top, width, height } = position;
        const windowWidth = window.innerWidth;
        const posBall = windowWidth > 768
            ? setPos(left - 120, top - 130)
            : setPos(-12, -8, 80);
        const posTree = windowWidth > 768
            ? setPos(left + width - 200, top - 50, 250)
            : setPos(200, 40, 120);
        const posHat = windowWidth > 768
            ? setPos(left - 240, top + height / 2 - 200)
            : setPos(270, 270, 80);
        const posSnowflake = windowWidth > 768
            ? setPos(left + width + 30, top + height / 2)
            : setPos(310, 500, 80);
        const posStocking = windowWidth > 768
            ? setPos(left - 100, top + height - 120)
            : setPos(-10, top + height - 560, 80);
        const posCandy = windowWidth > 768
            ? setPos(left + width - 80, top + height)
            : setPos(300, top + height - 100, 80);

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
