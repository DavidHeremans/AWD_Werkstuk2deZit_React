import React from 'react';
import './Spells.css'
import addImage from './images/addIcon.png';

const spell = (props) => {
    return (
        <li className="spellLi">
            <p> Spell: {props.name}</p>
            <p>Level: {props.level}</p>
            <input type="image" src={props.image} alt="add" className="addImage" name="spellIndex" value={props.index}
                   onClick={props.save}/>


        </li>
    );
}

export default spell;