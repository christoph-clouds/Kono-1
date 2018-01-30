import React, { Component } from 'react'
import { ref, firebaseApp } from '../../config/constants'
import './Event.css';

export default class Event extends Component {

	constructor(props) {
    	super(props)
		this.goToDetails = this.goToDetails.bind(this)
		this.goToInventory = this.goToInventory.bind(this)
		this.goToGuests = this.goToGuests.bind(this)
		this.getTitle = this.getTitle.bind(this)

		//let eventTitle = firebaseApp.database().ref('events/' + sessionStorage.curEvent + '/title').val(); 
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

	getTitle() { 
		var eventTitle;
		let eventRef = firebaseApp.database().ref('events/' + sessionStorage.curEvent); 
		eventRef.on("value", function(snapshot){
			console.log("title " + snapshot.val().title);
			var eventTitle = snapshot.val().title;
			//console.log(eventTitle);
			return {__html: eventTitle};	
		})
	}

	render () {

		return (
			
			<div>
			<h1 id="eventTitle" dangerouslySetInnerHTML={this.getTitle()} />
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