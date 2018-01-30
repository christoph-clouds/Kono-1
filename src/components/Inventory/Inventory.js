import React, { Component } from 'react'
//import { ref } from '../../config/constants'
import './Inventory.css'
import { Link } from 'react-router-dom'

export default class Inventory extends Component {

	constructor(props) {
    	super(props)
  	}

	render () {
		
		return (
			

			<div className="back">
		      	<Link to={`/events/${this.props.match.params.eventid}`} >
				    Back
			   	</Link>
		    </div>


		);
	}
}