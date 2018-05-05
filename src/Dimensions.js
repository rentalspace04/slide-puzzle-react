import React, { Component } from 'react';
import "./styles/Dimensions.css"

class Dimensions extends Component {

    changeDimensions(e, isN) {
        const newValue = e.target.value
        const newDim = parseInt(newValue, 10)
        if (!isNaN(newDim)) {
            this.props.handleChange(newDim, isN)
        }
    }
    render() {
        return (
            <div className="Dimensions">
                <p> Dimensions: 
                    {/* M dimension */}
                    <input type="text" onChange={(e) => this.changeDimensions(e, false)} />
                    {/* N dimension */}
                    <input type="text" onChange={(e) => this.changeDimensions(e, true)} />
                </p>
            </div>
        );
    }
}

export default Dimensions;