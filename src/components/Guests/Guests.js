import React, { Component } from 'react'
//import { ref } from '../../config/constants'
import './Guests.css'
import { Link } from 'react-router-dom'

export default class Guests extends Component {

	constructor(props) {
    	super(props)
  	}

	render () {
		
		return (
			

			<div className="back">
				<h1></h1>
		    	<Link to={`/events/${this.props.match.params.eventid}`} >
				          Back
			   	</Link>
		    </div>



		);
	}
}