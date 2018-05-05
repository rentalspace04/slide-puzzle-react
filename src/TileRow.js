import React, { Component } from 'react'
import _ from "lodash"
import "./TileRow.css"
import Tile from "./Tile"

class TileRow extends Component {
    render() {
        const elements = _.map(this.props.tiles, (elem, i) => {
            return (
                <Tile key={i} 
                    element={elem}
                    move={this.props.move}
                    rowNum={this.props.rowNum}
                    colNum={i} />
            )
        })
        
        return (
            <div className="TileRow">
                {elements}
            </div>
        );
    }
}

export default TileRow;