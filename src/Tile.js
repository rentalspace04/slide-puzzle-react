import React, { Component } from 'react'
import "./Tile.css"

class TileRow extends Component {
    render() {
        const i = this.props.colNum
        const j = this.props.rowNum
        let elem = this.props.element;
        if (elem === 0) {
            elem = "."; // For some reason a space/empty string gives formating troubles
        } 
        return (
            <div className="Tile" onClick={(e) => this.props.move(i, j)}>
                {elem}
            </div>
        );
    }
}

export default TileRow;