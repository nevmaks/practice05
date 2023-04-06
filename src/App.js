import './App.css';
import React from "react";

import GridComponent from "./grid";
import UserDetails from "./user-details";
import {SummaryActive, SummaryUsers} from "./summaries";

function App() {
    return (
        <>
            <GridComponent>
                <SummaryActive />
                <SummaryUsers />
            </GridComponent>
            <UserDetails />
        </>
    );
}

export default App;
