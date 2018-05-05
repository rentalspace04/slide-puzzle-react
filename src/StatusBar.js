import React, { Component } from 'react'
import './styles/StatusBar.css'
import _ from "lodash"

class StatusBar extends Component {
    hasWon() {
        if (!this.props.changed) {
            return false;
        }
        const tiles = _.flatten(this.props.tiles);
        for (let i = 0; i < tiles.length - 1; i++) {
            if (tiles[i] !== i + 1) {
                return false
            }
        }
        // Haven't checked the last element (0) but it could only be that one
        return true;
    }

    render() {
        return (
            <div className="StatusBar" hidden={!this.hasWon()}>
                <p>Congratulations! You've solved the puzzle!</p>
            </div>
        );
    }
}

export default StatusBar;