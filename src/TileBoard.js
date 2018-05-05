import React, { Component } from 'react'
import TileRow from "./TileRow"
import "./styles/TileBoard.css"

class TileBoard extends Component {
    render() {
        const rows = Array(this.props.rows);

        for (let i = 0; i < this.props.rows; i++) {
            const thisRow = this.props.tiles[i]
            rows[i] = (<TileRow key={i} tiles={thisRow} rowNum={i} move={this.props.move}/>)
        }
        
        return (
            <div className="TileBoard">
                {rows}
            </div>
        );
    }
}

export default TileBoard;