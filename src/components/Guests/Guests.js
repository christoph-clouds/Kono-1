import React, { Component } from 'react'
import { ref } from '../../config/constants'
import './Guests.css';

import {
  withRouter
} from 'react-router-dom'

export default class Guests extends Component {

	constructor(props) {
    	super(props)
		this.goBack = this.goBack.bind(this)
  	}

  	goBack() {
		this.props.history.push('../event')
	}

	render () {
		
		return (
			

			<div className="back">
				<h1></h1>
		    	<button onClick={this.goBack}>BACK</button>
		    </div>



		);
	}
}