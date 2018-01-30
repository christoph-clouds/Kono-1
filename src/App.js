import React from 'react'
import CreateEvent from './components/CreateEvent/CreateEvent'
import Login from './components/Login/Login'
import Events from './components/Events/Events'
import Event from './components/Event/Event'
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const RouterNav = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/create-event">Create Event</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

      <hr/>
      <Switch>
        <Route exact path="/create-event" component={CreateEvent}/>
        <Route exact path="/events" component={Events}/>
        <Route path="/login" component={Login}/>
        <Route exact path="/event" component={Event}/>
      </Switch>   
    </div>
  </Router>
)

export default RouterNav