import React, { Component } from 'react';
import './AlphaButtons.css';

class AlphaButtons extends Component {
    render() {
        return (
            <div className='AlphaButtons'>
                {this.props.generateButtons(this.props.letters)}
            </div>
        )
    }
}


export default AlphaButtons;