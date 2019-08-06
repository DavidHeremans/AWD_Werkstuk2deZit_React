import React, {Component} from 'react';
import Spells from './Spells/Spells';
import SpellCard from './SpellCard/SpellCard';
import './App.css';
import axios from 'axios';

//Bronnen
// API ophalen: https://stackoverflow.com/questions/54592441/promise-all-and-correctly-update-the-state-using-react-js
// Zoekfunctie: https://www.youtube.com/watch?v=YRiMo2EjVds
// delete from array https://stackoverflow.com/questions/36326612/delete-item-from-state-array-in-react

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
            value: '',
            indexInLocal: [],
            selected: null
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
        this.setState({selected: e});
        const indexSpell = e.target.value;
        localStorage.setItem(indexSpell, indexSpell);
        this.getFromLocalStorage(indexSpell);
    };

    getFromLocalStorage = (value) => {
        if (this.state.indexInLocal.includes(value)) {
            console.log('Already in it');
        } else {
            this.setState({indexInLocal: [...this.state.indexInLocal, localStorage.getItem(value)]})
        }
    };

    removeFromLocalStorage = (e) => {
        let array = [...this.state.indexInLocal];
        let index = array.indexOf(e.target.value);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({indexInLocal: array});
            localStorage.removeItem(e.target.value);
        }
    };

    render() {
        const splInf = this.state.spellsInfo.filter(searchName(this.state.value)).map((spell) => {
            return <Spells name={spell.name} level={spell.level} index={spell.index} save={this.saveInLocalStorage}/>
        });


        const spellBook = this.state.spellsInfo.map((spell) => {
            if (this.state.indexInLocal.includes(spell.index.toString())) {
                return <SpellCard index={spell.index} level={spell.level} name={spell.name} desc={spell.desc}
                                  range={spell.range} duration={spell.duration} remove={this.removeFromLocalStorage}/>
            }

        });

        return (
            <div className="App">
                <h1>Spellbook</h1>
                <ul>
                    {spellBook}
                </ul>
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
