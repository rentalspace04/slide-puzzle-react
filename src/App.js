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
            tiles: this.remakeTiles(3, 3)
        }
        this.changeDimensions = this.changeDimensions.bind(this)
    }

    changeDimensions(newDim, isN) {
        const newState = {}
        let cols = this.state.m
        let rows = this.state.n
        if (isN) {
            newState.n = newDim
            rows = newDim
        } else {
            newState.m = newDim
            cols = newDim
        }
        console.log(cols, rows)
        newState.tiles = this.remakeTiles(cols, rows)
        this.setState(newState)
    }

    remakeTiles(cols, rows) {
        const tiles = Array(rows)
        for (let i = 0; i < rows; i++) {
            const start = 1 + cols * i
            tiles[i] = _.range(start, start + cols)
        }
        tiles[rows - 1][cols- 1] = 0
        return tiles;
    }

    shuffleTiles() {

    }

    moveTile(i, j) {
        const spacePosition = this.movesInto(i, j);
        if (!_.isEmpty(spacePosition)) {
            const new_i = spacePosition[0]
            const new_j = spacePosition[1]

            const tiles = _.cloneDeep(this.state.tiles)
            const thisTile = tiles[j][i]
            tiles[j][i] = 0;
            tiles[new_j][new_i] = thisTile
            this.setState({tiles})
        }
    }

    movesInto(i, j) {
        let di = 1; // Change in i
        let dj = 0; // Change in j
        for (let k = 0; k < 4; k++) {
            // Swap di and dj
            const old_di = di;
            di = dj;
            dj = old_di;
            // Halfway through, check the negatives
            if (k === 2) {
                di = -1 * di;
                dj = -1 * dj;
            }
            if (!this.outsideBoard(i + di, j + dj)) {
                const tileAtPosition = this.state.tiles[j + dj][i + di];
                if (tileAtPosition === 0) {
                    return [i + di, j + dj];
                }
            }
        }
        return [];
    }

    outsideBoard(i, j) {
        return i < 0 || j < 0 || i >= this.state.m || j >= this.state.n
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Slide Puzzle</h1>
                </header>
                <Dimensions handleChange={this.changeDimensions} />
                <TileBoard cols={this.state.m} rows={this.state.n} tiles={this.state.tiles} />
                <button type="button" onClick={(e) => this.shuffleTiles()}>Shuffle</button>
            </div>
        );
    }
}

export default App;
