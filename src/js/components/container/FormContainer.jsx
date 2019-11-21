import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";
import { updatePeople, getDataAll } from './utils';

const parameters = [
    {
        id: 'age',
        label: 'Age',
        min: 20,
        max: 80,
        default: 25,
        formart: ".2s"
    },
    {
        id: 'retirementAge',
        label: 'Retirement Age',
        min: 20,
        max: 80,
        default: 65,
        formart: ".2s"
    },
    {
        id: 'expenses',
        label: 'Monthly Expenses',
        min: 5000,
        max: 500000,
        default: 20000,
        formart: ".2s"
    },
    {
        id: 'contributions',
        label: 'Monthly Contribution',
        min: 1000,
        max: 200000,
        default: 5000,
        formart: ".2s"
    },
    {
        id: 'savings',
        label: 'Current Savings',
        min: 0,
        max: 100000000,
        default: 100000,
        formart: ".2s"
    },
];

const logslider = (position, min, max) => {
    const minp = 0;
    const maxp = 100;
    const minv = Math.log(min);
    const maxv = Math.log(max);
    const scale = (maxv - minv) / (maxp - minp);

    return roundIt(Math.exp(minv + scale * (position - minp)));
}

class FormContainer extends Component {
    constructor() {
        super();
        const people = [
            {
                i: 0.09,
                inf: 0.06,
                age: 25,
                retirementAge: 65,
                expenses: 20000,
                contributions: 10000,
                savings: 100000,
                timeseries: []
            }
        ];
        this.state = {
            people,
            dataAll: getDataAll(updatePeople(people))
        };
        this.handleChange = this.handleChange.bind(this);
        this.addPerson = this.addPerson.bind(this);
    }
    addPerson() {
        const copyPerson = Object.assign({}, this.state.people[0]);
        const newPeople = [...this.state.people ];
        newPeople.push(copyPerson);
        const people = updatePeople(newPeople);
        const dataAll = getDataAll(people);
        this.setState({people: newPeople, dataAll});
    }
    handleChange(personId, param, event) {
        const nextPeople = [...this.state.people ];
        nextPeople[personId][param] = parseInt(event.target.value);
        const people = updatePeople(nextPeople);
        const dataAll = getDataAll(people);
        this.setState({ people, dataAll });
    }
    render() {
        const { people, dataAll } = this.state;

        const myStyle = {
            'display': 'flex',
            'flexWrap': 'wrap',
            'justifyContent': 'space-between'
        };

        const peopleRanges = people.map( ( person, i ) => (
            parameters.map( param => (
                    <Input
                        text={person[param.id].toString()}
                        label={param.label}
                        type="range"
                        personId={i}
                        paramId={param.id}
                        min={param.min}
                        max={param.max}
                        id={ `${i.toString()}_${param.id}` }
                        key={ `${i.toString()}_${param.id}` }
                        value={person[param.id]}
                        handleChange={this.handleChange}
                        valueFormat={param.format}
                    />
            ) )
        ) );
        
        return (
            <div>
                <div style={myStyle}>
                    <div>Age</div>
                    <div>Retirement Age</div>
                    <div>Monthly Spending</div>
                    <div>Monthly Contribution</div>
                    <div>Current Savings</div>
                </div>
                { peopleRanges.map( ( person, i ) => ( <div style={myStyle} key={i}>{ person }</div> ) ) }
                <button onClick={this.addPerson}>Add Person</button>
            </div>
        );
    }
}
export default FormContainer;

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;