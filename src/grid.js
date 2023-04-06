import PropTypes from "prop-types";
import React, {cloneElement, memo, useCallback, useEffect, useRef, useState} from "react";

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

const MemoGridRecord = memo(GridRecord);

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

export default function GridComponent({children}) {
    let filterInput = useRef(null);

    useEffect(() => {
        filterInput.current.focus();
    }, []);

    const [records, setRecords] = useState(dataSource);

    function toggleActive(index) {
        dataSource[index] = { ...dataSource[index], active: !dataSource[index].active };
        setRecords([...records]);
    }

    const toggle = useCallback(toggleActive, []);

    function handleFilterChange(e) {
        let value = e.target.value;
        setRecords(
            dataSource.filter((record) =>
                record.firstName.toUpperCase().includes(value.toUpperCase())
            )
        );
    }

    let recordsGrid = records.map((record, index) => {
        return <MemoGridRecord record={record} key={index} index={index} toggleActive={ toggle } />
    });

    return (
        <div style={{width: 300, height: 300, padding:20}}>
            <p>
                <input type="text" ref={filterInput} placeholder="Filter by..." onChange={handleFilterChange}/>
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
            <div>{ children[0] && cloneElement( children[0], { records: records })}</div>
            <div>{ children[1] && cloneElement( children[1], { records: records })}</div>
        </div>
    );
}