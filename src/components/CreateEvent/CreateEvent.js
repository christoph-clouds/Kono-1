import React, { Component } from 'react'
import { ref, firebaseApp} from '../../config/constants'
import { Link } from 'react-router-dom'
import './CreateEvent.css';
import Location from '../../images/icons/location.png';
import Calendar from '../../images/icons/calendar.png';
import Time from '../../images/icons/time.png';
import {today} from '../../helpers/date.js';

export default class CreateEvents extends Component {
	
  	constructor(props) {
    	super(props);
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
    	this.resetForm = this.resetForm.bind(this);
    	this.state = {
	    	title: '',
	    	description: '',
	    	location: '',
  			date: '',
  			time: ''
	    }
	    this.baseState = this.state;
  	}

  	handleSubmit(event) {
		event.preventDefault();
		firebaseApp.auth().onAuthStateChanged((user) => {
		  	if (user) {
		  		console.log("title" + this.state.title);
				var newEvent = ref.push();  
				newEvent.set({
				    host: user.uid,
				  	hostSpecial: {
				  		name: user.displayName,
		          		profileImg: user.photoURL
				    },
				   	mainMessage: "Aloha",
		          	guestMessage: "invite others :)",
				    title: this.state.title,
				    desc: this.state.description,
				    location: this.state.location,
				    date: this.state.date,
				    time: this.state.time,
				    inventory: [""],
				    wishlist: [""],
				    boozeStatus: '0%'
	  			});	
	 			this.props.history.push('/events')
	  			this.resetForm()
			}
			else{
				console.log("user isnt logged in");
	 			this.props.history.push('/login')
			}
		});
  	}

  	handleChange(event){
  		const name = event.target.name;
  		const value = event.target.value;
  		this.setState({
  			[name]: value
  		});
  	}

  	resetForm = () => {
  		this.setState(this.baseState)
  	}

  	render () {
	    return (
	      <div className="pagecontent formcontent">
	        <h1 className="subtitle">Create New Event</h1>
			<div className="heading eventform">
				<form id="createEventForm" onSubmit={this.handleSubmit} >

					<div className="formelement">
						<input name="title"value={this.state.title} onChange={this.handleChange} type="text" id="newEventTitle" placeholder="event title" maxLength="50" className="inputfield" required/>
					</div>

					<div className="formelement">
						<textarea name="description" placeholder="tell your guests what your party is about" value={this.state.description} className="inputfield" onChange={this.handleChange} type="text" id="newEventDesc"></textarea>
					</div>

					<div className="formelement">
						<img src={Location} className="formicon" alt="location icon"></img>

						<input name="location"  value={this.state.location} onChange={this.handleChange} type="text" maxLength="50" className="inputfield" id="newEventLocation" placeholder="location"/>
					</div>

					<div className="formelement">
						<img src={Calendar} className="formicon" alt="calendar icon"></img>
						<input name="date" value={this.state.date} onChange={this.handleChange} type="date" className="inputfield" id="newEventDate" min={today} required/>
					</div>

					<div className="formelement">
						<img src={Time} className="formicon" alt="time icon"></img>
						<input name="time" value={this.state.time} onChange={this.handleChange} type="time" className="inputfield" id="newEventTime"/>
					</div>

					
					<div className="buttonsWrapper">
						<button id="button" type="submit" className="submitbutton" value="Submit">Create Event</button>
						<div className="buttonsWrapper2">
							<button onClick={this.resetForm} type="button" className="clearbutton">clear form</button>
							<Link to={`/events`} >
								<button  type="button" className="clearbutton">cancel</button>
							</Link>
						</div>
					</div>
				</form>
			</div>
	      </div>
	    )
	}
}
