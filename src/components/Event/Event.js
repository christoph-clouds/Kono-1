import React, { Component } from 'react'
import { ref } from '../../config/constants'
import './Event.css';

import {
  withRouter
} from 'react-router-dom'

export default class Event extends Component {

	constructor(props) {
    	super(props)
		this.goToDetails = this.goToDetails.bind(this)
		this.goToInventory = this.goToInventory.bind(this)
		this.goToGuests = this.goToGuests.bind(this)

  	}

  	goToDetails() {
		this.props.history.push('event/details')
	}


  	goToInventory() {
		this.props.history.push('event/inventory')
	}


  	goToGuests() {
		this.props.history.push('event/guests')
	}

	render () {
		
		return(
			
			<div className="eventmenu">
				<div className="menubutton details" onClick={this.goToDetails}>
                    Details
				</div>

				<div className="menubutton inventory" onClick={this.goToInventory}>
                    Inventory
				</div>

				<div className="menubutton guests" onClick={this.goToGuests}>
                    Guestlist
				</div>
				<div className="eventmenufooter">
                    <p className="heading">"A message to y'all!"</p>
                    <button className="chartoombutton">Chat</button>
				</div>

		    </div>
		);
	}
}