import React, { Component } from 'react'
import _ from "lodash"
import "./TileRow.css"

class TileRow extends Component {
    render() {
        const elements = _.map(this.props.tiles, (elem, i) => {
            return (<div className="Tile" key={i}>{elem}</div>)
        })
        
        return (
            <div className="TileRow">
                {elements}
            </div>
        );
    }
}

export default TileRow;