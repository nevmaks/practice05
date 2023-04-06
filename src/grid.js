import PropTypes from "prop-types";
import React, {cloneElement, memo, useCallback, useEffect, useRef, useState} from "react";

const dataSource = [
    {id: 1, firstName: "John", lastName: "Doe", active: false},
    {id: 2, firstName: "Mary", lastName: "Moe", active: false},
    {id: 3, firstName: "Peter", lastName: "Noname", active: true}
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
        id: PropTypes.number.isRequired,
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

    const toggle = useCallback(toggleActive,[]);

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
            <div>
                {React.Children.map(children, (child) => cloneElement(child, { records: records }))}
            </div>
        </div>
    );
}