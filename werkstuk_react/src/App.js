import React, {Component} from 'react';
import Spells from './Spells/Spells';
import './App.css';
import axios from 'axios';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            spells: [],
            spellsInfo: [],
            isLoaded: false
        };
    }


    componentDidMount() {

        axios.get('http://www.dnd5eapi.co/api/spells/')
            .then(response => {
                this.setState({spells: response.data.results});
                this.loadInfo();
            });


    }

    loadInfo() {
        Promise.all(this.state.spells.map(name =>
                axios.get(name.url)
                    .then(response => {
                            [response.data].forEach((spell) =>
                                this.state.spellsInfo.push(spell)
                            )
                           
                        }
                    )
            ),
        )
    }


    render() {


        const splInf = this.state.spellsInfo.map((spell) => {
            return <Spells name={spell.name} level={spell.level}/>

        });

        return (

            <div className="App">
                <h2>Spells from DnD</h2>

                <section className="Spells">

                    <div>{splInf}</div>

                </section>
            </div>
        );

    }
}

export default App;
