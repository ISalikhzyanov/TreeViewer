import React, {useEffect, useState} from 'react';
import TreeChart from "./components/TreeChart";
import "./App.css"


const App = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/data")
            .then(r => r.json())
            .then(res => setData(res))
    }, [])
    console.log(data)


    return (
        <React.Fragment>
            <TreeChart data={data}/>

        </React.Fragment>
    );
};

export default App;