import React, {Component} from 'react';
import Spells from './Spells/Spells';
import './App.css';
import axios from 'axios';

//Bronnen
// API ophalen: https://stackoverflow.com/questions/54592441/promise-all-and-correctly-update-the-state-using-react-js
// Zoekfunctie: https://www.youtube.com/watch?v=YRiMo2EjVds

function searchName(value) {
    return function (x) {
        return x.name.toLowerCase().includes(value.toLowerCase()) || !value;
    }
}

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            spells: [],
            spellsInfo: [],
            value: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }


    componentDidMount() {

        axios.get('http://www.dnd5eapi.co/api/spells/')
            .then(response => {
                this.setState({spells: response.data.results});
                this.loadInfo();
            });


    }

    loadInfo = () => {
        Promise.all(this.state.spells.map(name =>
                axios.get(name.url)
                    .then(response => {
                            [response.data].forEach((spell) =>
                                this.setState({spellsInfo: [...this.state.spellsInfo, spell]})
                            )
                        }
                    )
            )
        )
    };

    onChangeHandler = (e) => {
        this.setState({value: e.target.value})
    };

    saveInLocalStorage = (e) => {
        const indexSpell = e.target.value;
        console.log(indexSpell);
        localStorage.setItem("spellIndex", indexSpell);
    };

    render() {
        const splInf = this.state.spellsInfo.filter(searchName(this.state.value)).map((spell) => {
            return <Spells name={spell.name} level={spell.level}/>
        });

        return (
            <div className="App">
                <h2>Spells from DnD</h2>
                <form>
                    <label>Search</label>
                    <input type="text" value={this.state.value} onChange={e => this.onChangeHandler(e)}/>
                </form>
                <section className="Spells">
                    <div>
                        {splInf}
                    </div>
                </section>
            </div>
        );

    }
}

export default App;
