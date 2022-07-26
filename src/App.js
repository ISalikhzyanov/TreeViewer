import React from 'react';
import TreeChart from "./components/TreeChart";
import "./App.css"
import db from "./server/db.json"

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    async componentDidMount() {
        const newData = db.data;
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