import React from 'react';
import ReactDOM from "react-dom";

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

const Icons = (props) => {

    if ( ! props.position ) {
        return null;
    }

    const { left, top, width, height } = props.position;
    const posBall = randomPos(left - 120, top - 150);
    const posTree = randomPos(left + width - 150, top - 100);
    const posHat = randomPos(left - 240, top + height / 2 - 150);
    const posSnowflake = randomPos(left + width, top + height / 2);
    const posStocking = randomPos(left-100, top + height-140);
    const posCandy = randomPos(left + width - 150, top + height);

    console.log(props.position || {});

    return (
        <div className="icons">
            <img src={Ball} style={posBall} />
            <img src={Tree} style={posTree} />
            <img src={Candy} style={posCandy} />
            <img src={Hat} style={posHat} />
            <img src={Snowflake} style={posSnowflake} />
            <img src={Stocking} style={posStocking} />
        </div>
    )
}

export default Icons;
