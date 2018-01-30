import React from 'react'
import CreateEvent from './components/CreateEvent/CreateEvent'
import Login from './components/Login/Login'
import Events from './components/Events/Events'
import Event from './components/Event/Event'
import Details from './components/Details/Details'
import Inventory from './components/Inventory/Inventory'
import Guests from './components/Guests/Guests'
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
        <Route exact path="/event/details" component={Details}/>
        <Route exact path="/event/inventory" component={Inventory}/>
        <Route exact path="/event/guests" component={Guests}/>
      </Switch>   
    </div>
  </Router>
)

export default RouterNav