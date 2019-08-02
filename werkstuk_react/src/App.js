import React, {Component} from 'react';
import Spells from './Spells/Spells';
import './App.css';
import axios from 'axios';


class App extends Component {

    state = {
        spells: []
    };

    componentDidMount() {
        axios.get('http://www.dnd5eapi.co/api/spells/')
            .then(response => {
        this.setState({spells: response.data.results});
        });
    }
    render() {
        console.log(this.state.spells);
        const spls = this.state.spells.map((spell) => {
            return <Spells name={spell.name} url={spell.url} level={spell.level}/>

        });

        return(
            <div>
                <section className="Spells">
                   <p>{spls}</p>
                </section>
            </div>
        );

    }
}

export default App;
