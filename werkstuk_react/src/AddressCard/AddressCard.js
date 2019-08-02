import React from 'react';
import './AddressCard.css';

const addresscard = (props) => {

    let classes = ['card'];
    if(props.zip >= 1000 && props.zip <= 1999){
        classes.push('brussel');
    }else if(props.zip >= 2000 && props.zip <= 2999){
        classes.push('antwerpen');
    }else if(props.zip >= 9000 && props.zip <= 9999){
        classes.push('gent');
    }else if(props.zip >= 3000 && props.zip <= 3999){
        classes.push('leuven');
    }else {
        classes.push('other');
    }

    if(props.name == 'David'){
        classes.push('user');
    }

    return(
        <div className={classes.join(' ')}>
            <h2>Address of {props.name}</h2>
            <p>Student aan ehb</p>
            <p>Afkomstig van {props.city}</p>
            </div>
    );
}

export default addresscard;