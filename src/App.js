import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Navigation from './components/Navigation'
import NoteList from './components/NoteList'
import CreateUser from './components/CreateUser'
import CreateNote from './components/CreateNote'


function App() {
  return (
    <Router>
      <Navigation></Navigation>

      <div className="container p-4">
        <Route path="/" exact component={NoteList} />
        <Route path="/user" component={CreateUser} />
        <Route path="/create" component={CreateNote} />
        <Route path="/edit/:id" component={CreateNote} />
      </div>

    </Router>
  );
}

export default App;
