import React from 'react';
import './Spells.css'

const spell = (props) => {

    return (
        <div className="card">
            <p> Spell: {props.name}</p>
            <p>Level: {props.level}</p>
            <button type="submit" >+</button>



        </div>
    );
}

export default spell;