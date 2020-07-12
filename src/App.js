import React from 'react';
import './App.css';
import Dashboard from './dashboard/Dashboard'
import { Router } from "@reach/router"
import UserForms from './user-forms/UserForms';

class App extends React.Component{
  render() {
    return (
      <div className="App">
        <Router>
           <UserForms path="/" />
           <Dashboard path="dashboard" />
        </Router>
      </div>
    );
  }
}

export default App;
