import React, { Component } from 'react'
import './styles/App.css'
import TileBoard from "./TileBoard"
import Dimensions from './Dimensions'
import StatusBar from "./StatusBar"
import _ from "lodash"

const randomMove = () => {
    // 0 and 1 must be slightly more likely than other moves
    if (Math.random() < 0.55) {
        return Math.floor(2 * Math.random()) // Return 0 or 1
    }
    return Math.floor(2 * Math.random()) + 2
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            m: 3,
            n: 3,
            boardChanged: false,
            tiles: this.remakeTiles(3, 3)
        }
        this.changeDimensions = this.changeDimensions.bind(this)
        this.movesInto = this.movesInto.bind(this)
        this.moveTile = this.moveTile.bind(this)
        this.outsideBoard = this.outsideBoard.bind(this)
        this.shuffleTiles = this.shuffleTiles.bind(this)
        this.makeRandomMove = this.makeRandomMove.bind(this)
    }

    changeDimensions(newDim, isN) {
        const newState = {
            boardChanged: false
        }
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
        tiles[rows - 1][cols - 1] = 0
        return tiles;
    }

    shuffleTiles() {
        let i = 0;
        const shuffles = 20 * this.state.m * this.state.n;
        let last_move = null;
        const sleepMove = () => {
            last_move = this.makeRandomMove(last_move)
            if (i < shuffles) {
                i++;
                setTimeout(sleepMove, 25)
            }
        }
        setTimeout(sleepMove, 5)
        
    }

    makeRandomMove(last_move) {
        // Possible moves that could be made
        console.log("Making ranom move")
        const moves = [[-1, 0], [0, -1], [1, 0], [0, 1]];
        console.log(this.state.tiles)
        const zero_j = _.findIndex(this.state.tiles, row => _.includes(row, 0))
        const zero_i = _.findIndex(this.state.tiles[zero_j], elem => elem === 0)
        // Find a valid move (starting from random)
        let i = randomMove();
        let checked = 0;
        while (checked < 4) { // Should never have to rely on this, but JIC
            const move = moves[i];
            const move_i = zero_i + move[0];
            const move_j = zero_j + move[1];
            console.log(`moving ${move_i}, ${move_j}`)
            
            // If this is a valid move, do it
            if (!this.outsideBoard(move_i, move_j)) {
                // Check that this isn't just reversing the last move
                if (last_move == null || (last_move[0] !== move_i && last_move[1] !== move_j)) {
                    console.log("inside board")
                    this.moveTile(move_i, move_j)
                    return [zero_i, zero_j];
                }
            }
            // Otherwise, check next move in order
            i = (i + 1) % 4;
            checked++;
        }
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
            this.setState({tiles, boardChanged: true})
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
                <TileBoard 
                    cols={this.state.m} 
                    rows={this.state.n} 
                    tiles={this.state.tiles} 
                    move={this.moveTile} />
                <StatusBar tiles={this.state.tiles} changed={this.state.boardChanged} />
                <button type="button" onClick={(e) => this.shuffleTiles()}>Shuffle</button>
            </div>
        );
    }
}

export default App;
