import React, { Component } from 'react'
import "./Tile.css"

class TileRow extends Component {
    render() {
        const i = this.props.colNum
        const j = this.props.rowNum
        return (
            <div className="Tile" onClick={(e) => this.props.move(i, j)}>
                {this.props.element}
            </div>
        );
    }
}

export default TileRow;