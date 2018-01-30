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
		
		return (
			
			<div>
			<div className="details">
		      <button onClick={this.goToDetails}>Details</button>
		    </div>

		    <div className="inventory">
		      <button onClick={this.goToInventory}>Inventory</button>
		    </div>

		    <div className="guests">
		      <button onClick={this.goToGuests}>Guests</button>
		    </div>

		    </div>
		);
	}
}