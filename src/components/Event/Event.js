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
		var eventTitle = "BDAYYYY";
		let eventRef = firebaseApp.database().ref('events/' + sessionStorage.curEvent); 
		eventRef.on("value", function(snapshot){
			console.log("title " + snapshot.val().title);
			var eventTitle = snapshot.val().title;
			//console.log(eventTitle);
			return {__html: eventTitle};	
		})
		return {__html: eventTitle};	
	}

	render () {

		return(
			<div className="eventmenu">
				<h1 className="heading" dangerouslySetInnerHTML={this.getTitle()} />
				
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