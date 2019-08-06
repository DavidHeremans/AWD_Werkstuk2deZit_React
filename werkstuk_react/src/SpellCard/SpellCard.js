import React from 'react';
import './SpellCard.css';
import image from './images/delete.png';

const spellCard = (props) => {

    return (


        <li>
            <input alt="delete" type="image" src={image} className="remove" value={props.index}
                    onClick={props.remove}/>
            <p>Name: {props.name}</p>
            <p> Description: <small>{props.desc}</small></p>
            <p>Range: {props.range} </p>
            <p>Duration: {props.duration} </p>
            <p>Level: {props.level} </p>
        </li>


    );
}

export default spellCard;