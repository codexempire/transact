import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/HomePage/Dashboard';

export default () => (
    <Router>
        <Switch>
            <Route component={HomePage} path='/' exact />
            <Route component={HomePage} path='/login' exact />
            <Route component={HomePage} path='/signup' exact />
            <Route component={Dashboard} path='/dashboard' exact />
        </Switch>
    </Router>
)