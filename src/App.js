import React, {useEffect, useState} from 'react';
import TreeChart from "./components/TreeChart";
import "./App.css"


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    async componentDidMount() {
        const response = await fetch(
            `http://localhost:3001/data`

        );
        const newData = await response.json();
        this.setState({ data: newData });
    }
    render() {
const {data} = this.state;
if (data){
    return <React.Fragment>
        <TreeChart data={data}/>
    </React.Fragment>
} else {return null}
    }

}