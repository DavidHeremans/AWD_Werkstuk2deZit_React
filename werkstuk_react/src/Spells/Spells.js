import React from 'react';
import './Spells.css'

const spell = (props) => {

    return (
        <div className="card">
            <p> Spell: {props.name}</p>
            <p>Level: {props.level}</p>



        </div>
    );
}

export default spell;