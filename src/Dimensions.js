import React, { Component } from 'react';

class Dimensions extends Component {

    changeDimensions(e, isN) {
        const newValue = e.target.value
        const newDim = parseInt(newValue)
        if (!isNaN(newDim)) {
            this.props.handleChange(newDim, isN)
        }
    }
    render() {
        return (
            <div>
                {/* M dimension */}
                <input type="text" onChange={(e) => this.changeDimensions(e, false)} />
                {/* N dimension */}
                <input type="text" onChange={(e) => this.changeDimensions(e, true)} />
            </div>
        );
    }
}

export default Dimensions;