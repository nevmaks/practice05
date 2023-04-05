import './App.css';

import React, { useState } from "react";
import PropTypes from "prop-types";

const dataSource = [
    {firstName: "John", lastName: "Doe", active: false},
    {firstName: "Mary", lastName: "Moe", active: false},
    {firstName: "Peter", lastName: "Noname", active: true}
];

function GridRecord (props) {
    return (
        <tr>
            <td>{props.record.firstName}</td>
            <td>{props.record.lastName}</td>
            <td><input type="checkbox" checked={props.record.active} onChange={props.toggleActive}/></td>
        </tr>
    )
}

GridRecord.propTypes = {
    record: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    })
}

GridRecord.defaultProps = {
    record: {firstName: "N/A", lastName: "N/A", active: false}
}

function GridComponent() {
    const [records, setRecords] = useState(dataSource);

    function toggleActive(index) {
        records[index] = { ...records[index], active: !records[index].active };
        setRecords([...records]);
    }

    function handleFilterChange(e) {
        let value = e.target.value;
        setRecords(
            dataSource.filter((record) =>
                record.firstName.toUpperCase().includes(value.toUpperCase())
            )
        );
    }

    let recordsGrid = records.map((record, index) => {
        return <GridRecord record={record} key={index} toggleActive={ () => toggleActive(index)} />
    });

    return (
        <div style={{width: 300, height: 300, padding:20}}>
            <p>
                <input type="text" placeholder="Filter by..." onChange={handleFilterChange}/>
            </p>
            <table className="table table-condensed">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Active</th>
                </tr>
                </thead>
                <tbody>
                {recordsGrid}
                </tbody>
            </table>
        </div>
    );
}

function App() {
    return <GridComponent />
}

export default App;
