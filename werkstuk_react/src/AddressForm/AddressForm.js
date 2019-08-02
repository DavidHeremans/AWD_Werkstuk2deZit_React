import React from 'react';

const addressform = (props) => {
    return (
        <div>
            <form onSubmit={props.submit}>
                <h2>{props.children}</h2>
                <label>Name</label>
                <input type="text" name="name" value={props.name} onChange={props.change}/>
                <label>City</label>
                <input type="text" name="city" value={props.city} onChange={props.change}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default addressform;