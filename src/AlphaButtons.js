import React from 'react';
import './AlphaButtons.css';

function AlphaButtons(props) {
        return (
            <div className='AlphaButtons'>
                {props.generateButtons(props.letters)}
            </div>
        )
}

export default AlphaButtons;