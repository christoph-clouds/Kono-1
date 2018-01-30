import React, { Component } from 'react'
import { ref, firebaseApp } from '../../config/constants'
import './Event.css'
import { Link } from 'react-router-dom'

export default class Event extends Component {

	constructor(props) {
    	super(props)
    	console.log(this.props.match.params.eventid);
    	this.state = {
			title: ""
		};

		this.goToDetails = this.goToDetails.bind(this)
		this.goToInventory = this.goToInventory.bind(this)
		this.goToGuests = this.goToGuests.bind(this)
  	}

  	componentDidMount() {
  		let eventID = this.props.match.params.eventid;
  		let eventRef = firebaseApp.database().ref('events/' + eventID ); 
		eventRef.on("value", (snapshot)=>{
			
			let eventTitle = snapshot.val().title;
			console.log(eventTitle);
			this.setState({title: eventTitle});
			console.log("current State title :" + this.state.title);
		});	
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

	/*getTitle() { 
		var eventTitle = "BDAYYYY";
		let eventRef = firebaseApp.database().ref('events/' + sessionStorage.curEvent); 
		eventRef.on("value", function(snapshot){
			console.log("title " + snapshot.val().title);
			var eventTitle = snapshot.val().title;
			//console.log(eventTitle);
			return {__html: eventTitle};	
		})
		return {__html: eventTitle};	
	}*/

	render () {

		return (
			<div className="eventmenu">
				<h1 className="heading">{this.state.title} </h1>
				
				
				<Link className="menubutton details" to={`/events/${this.props.match.params.eventid}/details`} >
				          Details
			   	</Link>


				<Link className="menubutton inventory" to={`/events/${this.props.match.params.eventid}/inventory`} >
				          Inventory
			   	</Link>

				<Link className="menubutton guests" to={`/events/${this.props.match.params.eventid}/guests`} >
				          Guests
			   	</Link>
				<div className="eventmenufooter">
                    <p className="heading">"A message to y'all!"</p>
                    <button className="chartoombutton">Chat</button>
				</div>
		    </div>
		);
	}
}