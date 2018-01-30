import React, { Component } from 'react'
import { ref } from '../../config/constants'
import './CreateEvent.css';

export default class CreateEvents extends Component {
	
  	constructor(props) {
    	super(props);
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);

    	this.state = {
	    	title: '',
	    	description: '',
	    	location: "",
  			date: "",
  			time: ""
	    }
  	}

  	handleSubmit(event) {
		event.preventDefault();

		var newEvent = ref.push();  	
		newEvent.set({
		    host: sessionStorage.curUser,
		    title: event.target.title.value,
		    desc: event.target.description.value,
		    location: event.target.location.value,
		    date: event.target.date.value,
		    time: event.target.time.value,
		    theme: event.target.theme.value,
		    inventory: ["2bVodka", "3bBeer", "1bWine"],
		    wishlist: ["Chips", "Pizza"],
		    guests: []
  		});	
  	}

  	handleChange(event){
  		const name = event.target.name;
  		const value = event.target.value;
  		this.setState({
  			[name]: value
  		});
  	}

  	resetForm(){
  		this.setState({
  			title: "",
  			description: "",
  			location: "",
  			date: "",
  			time: ""
  		})
  	}


  	render () {
	    return (
	      <div>
	        <h1>
	        	Create Event
	        </h1>
	        <form id="createEventForm" onSubmit={this.handleSubmit}>
	        	
			    <label htmlFor="title">Event Title:</label><br />
			    <input name="title" value={this.state.title} onChange={this.handleChange} type="text" id="newEventTitle" placeholder="Lukas Birthday Party" />
			    <br />
			    <label htmlFor="description">Descripe Your Event:</label><br />
			    <input name="description" value={this.state.description} onChange={this.handleChange} type="text" id="newEventDesc" placeholder="It's gonna be awesome" />
			    <br />
			    Location <br />
			    <input name="location" value={this.state.location} onChange={this.handleChange} type="text" id="newEventLocation" placeholder="Broadway 1, 19283 New York" />
			    <br />
			    
			    Date <br />
			    <input name="date" value={this.state.date} onChange={this.handleChange} type="date" id="newEventDate" />
			    <br />
			    
			    Time <br />
			    <input name="time" value={this.state.time} onChange={this.handleChange} type="time" id="newEventTime" />
			     <br />


			    
			    Choose a Theme: <br />
			    <input name="theme" value={this.state.pTheme} onChange={this.handleChange} type="radio" value="p" checked={true} /> Pineapple <br />
			    <input name="theme" value={this.state.bTheme} onChange={this.handleChange} type="radio" value="b" /> Beach <br />
			    <input name="theme" value={this.state.tTheme} onChange={this.handleChange} type="radio" value="t" /> Tropic <br />
			    <input type="hidden" id="hiddenFieldCreateEvent" value="" name="id"/> 
			     <br />
			    <button id="button" type="submit" value="Submit">Create Event</button>
			</form>
	      </div>
	    )
	}
}