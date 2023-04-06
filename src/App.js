import './App.css';
import React from "react";

import GridComponent from "./grid";
import UserDetails from "./user-details";
import {SummaryActive, SummaryUsers} from "./summaries";

function App() {
    return (
        <React.Fragment>
            <GridComponent>
                <SummaryActive />
                <SummaryUsers />
            </GridComponent>,
            <UserDetails />
        </React.Fragment>
    );
}

export default App;
