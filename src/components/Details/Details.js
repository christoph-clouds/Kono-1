import React, { Component } from 'react'
//import { ref } from '../../config/constants'
import './Details.css';
import { Link } from 'react-router-dom'

export default class Details extends Component {

	constructor(props) {
    	super(props)
  	}

	render () {
		
		return (
			<div className="back pagecontent">
		      	<Link to={`/events/${this.props.match.params.eventid}`} >
				    Back
			   	</Link>
		    </div>
		);
	}
}