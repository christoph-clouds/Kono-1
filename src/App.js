import React from 'react'
import CreateEvent from './components/CreateEvent/CreateEvent'
import Login from './components/Login/Login'
import Logout from './components/Logout/Logout'
import Events from './components/Events/Events'
import Event from './components/Event/Event'
import Details from './components/Details/Details'
import Inventory from './components/Inventory/Inventory'
import Guests from './components/Guests/Guests'
import Invitation from './components/Invitation/Invitation'
import { signOut } from './helpers/auth'
import './App.css';
import {
  BrowserRouter as Router,
  Route, 
  Link,
  Switch
} from 'react-router-dom'

  let userbutton;
  if(sessionStorage.curUser != null){
    userbutton = "Logout";
  }
  else{
    userbutton = "Login";
  }

const RouterNav = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/create-event">Create Event</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to={userbutton.toLowerCase()} onClick={signOut}>{userbutton}</Link></li>
      </ul>

      <hr/>
      <Switch>
        <Route exact path="/create-event" component={CreateEvent} />
        <Route exact path="/events" component={Events} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route exact path="/events/:eventid" component={Event} />
        <Route exact path="/events/:eventid/details" component={Details} />
        <Route exact path="/events/:eventid/inventory" component={Inventory} />
        <Route exact path="/events/:eventid/guests" component={Guests} />
        <Route exact path="/events/:eventid/invitation" component={Invitation} />
      </Switch>   
    </div>
  </Router>
)

export default RouterNav