import React, { Component } from 'react'
//import { ref } from '../../config/constants'
import './Details.css';

export default class Details extends Component {

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
		      <button onClick={this.goBack}>BACK</button>
		    </div>



		);
	}
}