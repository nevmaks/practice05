import './App.css';

import React, { cloneElement, memo, useCallback, useState } from "react";
import PropTypes from "prop-types";

const dataSource = [
    {firstName: "John", lastName: "Doe", active: false},
    {firstName: "Mary", lastName: "Moe", active: false},
    {firstName: "Peter", lastName: "Noname", active: true}
];

function GridRecord ({record, toggleActive, index}) {
    return (
        <tr>
            <td>{record.firstName}</td>
            <td>{record.lastName}</td>
            <td><input type="checkbox" checked={record.active} onChange={() => toggleActive(index)}/></td>
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

const MemoGridRecord = memo(GridRecord);

function SummaryActive(props) {
    return (
        <div>Active Users: {props.records.filter((record) => record.active).length}</div>
    );
}

function SummaryUsers(props) {
    return (
        <div>User Count: {props.records.length}</div>
    );
}

function GridComponent({children}) {
    const [records, setRecords] = useState(dataSource);

    function toggleActive(index) {
        dataSource[index] = { ...dataSource[index], active: !dataSource[index].active };
        setRecords([...dataSource]);
    }

    function handleFilterChange(e) {
        let value = e.target.value;
        setRecords(
            dataSource.filter((record) =>
                record.firstName.toUpperCase().includes(value.toUpperCase())
            )
        );
    }

    const toggle = useCallback(toggleActive, []);

    let recordsGrid = records.map((record, index) => {
        return <MemoGridRecord record={record} key={index} index={index} toggleActive={ toggle } />
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
            <div>{ children && cloneElement( children, { records: records })}</div>
        </div>
    );
}

function App() {
    return (
        <GridComponent>
            <SummaryActive />
        </GridComponent>
    );
}

export default App;
