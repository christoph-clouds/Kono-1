import React, { Component } from 'react'
import { ref, firebaseApp } from '../../config/constants'
import { Redirect, Link} from 'react-router-dom'
import './Details.css';
import Location from '../../images/icons/location.png';
import Calendar from '../../images/icons/calendar.png';
import Time from '../../images/icons/time.png';
import {today} from '../../helpers/date.js';
import backArrow from '../../images/icons/back.png';

export default class CreateEvents extends Component {
	
  	constructor(props) {
    	super(props);
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
    	this.deleteEvent = this.deleteEvent.bind(this);
    	this.askdeleteEvent = this.askdeleteEvent.bind(this);
    	this.canceldeleteEvent = this.canceldeleteEvent.bind(this);

    	this.state = {
	    	title: '',
	    	description: '',
	    	location: "",
  			date: "",
  			time: "",
  			host: "",
  			isHost: false,
  			askIfDelete: false
	    }
  	}

  	handleSubmit(event) {
		var user = firebaseApp.auth().currentUser;

		if (user != null) {
			event.preventDefault();
			let currentEvent = this.props.match.params.eventid;
			var newEvent = firebaseApp.database().ref('events/' + currentEvent + '/');	
			newEvent.update({
			    title: event.target.title.value,
			    desc: event.target.description.value,
			    location: event.target.location.value,
			    date: event.target.date.value,
			    time: event.target.time.value,
			    theme: event.target.theme.value,
  			});	
  			this.props.history.push('./')
		}
  	}

  	handleChange(event){
  		const name = event.target.name;
  		const value = event.target.value;
  		this.setState({
  			[name]: value
  		});
  	}

  	componentDidMount(props) {
    	const currentUser = sessionStorage.curUser;
    	let currentEvent = this.props.match.params.eventid;
    	let detailsRef = firebaseApp.database().ref('events/' + currentEvent);

		detailsRef.on('value', (snapshot) => {
		    let information = snapshot.val();

		    if(information.host === sessionStorage.curUser){
				this.setState({isHost: true});
			}
	    	this.setState({
				title: 		information.title,
		        desc: 		information.desc,
		        location:	information.location,
		        date: 		information.date,
		        time: 		information.time,
		        //theme:		information.theme,
			}); 
		});		
	}

	askdeleteEvent(){
		this.setState({
			askIfDelete: true
		});
	}

	canceldeleteEvent(){
		this.setState({
			askIfDelete: false
		});
	}

	deleteEvent(props){
		this.props.history.push('../')
		let currentEvent = this.props.match.params.eventid;
		ref.child(currentEvent).remove();
		window.location.reload(); 
	}



  	render () {
	    return (
	    	<div className="pagecontent">
			  <div className="formcontent">
				  <h1 className="title">Event Details</h1>
					<div className="heading eventform">
						{this.state.isHost &&
						<div>
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

								<div className="formelement">
									<div>
										<input name="theme" value={this.state.pTheme} onChange={this.handleChange} type="radio" defaultChecked="true" id="pineapple"/>
										<label htmlFor="pineapple">Pineapple</label>
										<div className="theme">
											<div className="p1 themecolors"></div>
											<div className="p2 themecolors"></div>
											<div className="p3 themecolors"></div>
											<div className="p4 themecolors"></div>
											<div className="p5 themecolors"></div>
										</div>
										<input name="theme" value={this.state.bTheme} onChange={this.handleChange} type="radio" id="beach"/>
										<label htmlFor="beach">Beach</label>
										<div className="theme">
											<div className="b1 themecolors"></div>
											<div className="b2 themecolors"></div>
											<div className="b3 themecolors"></div>
											<div className="b4 themecolors"></div>
											<div className="b5 themecolors"></div>
										</div>
										<input name="theme" value={this.state.tTheme} onChange={this.handleChange} type="radio" id="tropic"/>
										<label htmlFor="tropic">Tropic</label>
										<div className="theme">
											<div className="t1 themecolors"></div>
											<div className="t2 themecolors"></div>
											<div className="t3 themecolors"></div>
											<div className="t4 themecolors"></div>
											<div className="t5 themecolors"></div>
										</div>
									</div>
								</div>
								<div className="buttonsWrapper">
									<button id="button" type="submit" className="submitbutton" value="Submit">Save Changes</button>
								</div>
							</form>
							{!this.state.askIfDelete &&
							<div className="warningBox">
								<button className="clearbutton" onClick={this.askdeleteEvent}>Delete Event</button>
							</div>
							}
							{this.state.askIfDelete &&
								<div className="warningBox">
									<h1 className="warningMessage">you are about to delete {this.state.title} </h1>
									<div>
										<button className="clearbutton" onClick={this.deleteEvent}>Delete Event</button>
										<button className="clearbutton cancelbutton" onClick={this.canceldeleteEvent}>Cancel</button>
									</div>
								</div>
							}
						</div>
						}
						{!this.state.isHost && 
							<div className="descriptionGuestView">
								<h3 className="subheading">{this.state.title} </h3>
								<h3 className="descriptiontext">{this.state.desc}</h3>
								<div className="horizontallyAligned descriptiontext">
									<img src={Location} className="formicon" alt="location icon"></img>
									<h3 className="">{this.state.location} </h3>
								</div>
								<div className="horizontallyAligned descriptiontext">
									<img src={Calendar} className="formicon" alt="calendar icon"></img>
									<h3>{this.state.date} </h3>
								</div>
								<div className="horizontallyAligned descriptiontext">
									<img src={Time} className="formicon" alt="time icon"></img>
									<h3>{this.state.time} </h3>
								</div>
							</div>
						}
					</div>
			  </div>
				<Link className="back" to={`/events/${this.props.match.params.eventid}`} >
					<img src={backArrow} alt="back" className="backIcon"></img>
				</Link>
			</div>
	    )
	}
}
