import React from 'react';
import { render } from "@testing-library/react";
import { Router, Route} from "react-router";
import ReactDOM from 'react-dom';
import { App } from '../App';
import { Home } from '../contains';
ReactDOM.render(
    <Router>
        <Route path={'/'} component={App}>
            <Route path={'home'} component={Home} />
        </Route>
    </Router>
);