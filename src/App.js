import React, { Component } from 'react'
import './App.css'
import TileBoard from "./TileBoard"
import Dimensions from './Dimensions'
import _ from "lodash"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            m: 3,
            n: 3,
            tiles: []
        }
        this.changeDimensions = this.changeDimensions.bind(this)
    }

    changeDimensions(newDim, isN) {
        if (isN) {
            this.setState({n: newDim})
        } else {
            this.setState({m: newDim})
        }
        this.remakeTiles()
    }

    remakeTiles() {
        const tiles = Array(this.state.n)
        for (let i = 0; i < this.state.n; i++) {
            const start = 1 + this.state.m * i
            tiles[i] = _.range(start, start + this.state.m)
        }
        tiles[this.state.n - 1][this.state.m - 1] = 0
    }

    shuffleTiles() {
        
    }

    moveTile(i, j) {

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Slide Puzzle</h1>
                </header>
                <Dimensions handleChange={this.changeDimensions} />
                <TileBoard m={this.state.m} n={this.state.n} tiles={this.state.tiles} />
                <button type="button" onClick={(e) => this.shuffleTiles()}>Shuffle</button>
            </div>
        );
    }
}

export default App;
