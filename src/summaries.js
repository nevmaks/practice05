import React from "react";

export function SummaryActive(props) {
    return (
        <div>Active Users: {props.records.filter((record) => record.active).length}</div>
    );
}

export function SummaryUsers(props) {
    return (
        <div>User Count: {props.records.length}</div>
    );
}