import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import './Event.css'
import { Link } from 'react-router-dom'

export default class Event extends Component {

	constructor(props) {
    	super(props)
    	this.state = {
			title: "",
			hostMessage: "",
			isHost: false,
			editView: false
		};
		this.editHostMessage = this.editHostMessage.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.resetForm = this.resetForm.bind(this);
  	}

  	componentDidMount() {
  		let eventID = this.props.match.params.eventid;
  		var user = firebaseApp.auth().currentUser;
  		
  		let eventRef = firebaseApp.database().ref('events/' + eventID ); 
  		if(eventRef){
  			eventRef.on("value", (snapshot)=>{
				let eventTitle = snapshot.val().title;
				let hostMessage = snapshot.val().mainMessage;
				let host = snapshot.val().host;
				if(host === sessionStorage.curUser){
					this.setState({isHost: true});
				}
				this.setState({
					title: eventTitle,
					hostMessage: hostMessage
				});
			});	
  		}
  	}

  	handleSubmit(event){
  		if(sessionStorage.curUser !== "null"){
			event.preventDefault();
			let currentEvent = this.props.match.params.eventid;
			let eventRef = firebaseApp.database().ref('events/' + currentEvent);
		  	eventRef.update({
		    	mainMessage: event.target.hostMessage.value
		  	});
		  	this.resetForm()
		}

        this.setState({
            editView: false
        });
  	}

  	resetForm(){
  		this.setState(this.baseState)
  	}


  	handleChange(event){
  		const name = event.target.name;
  		const value = event.target.value;
  		this.setState({
  			[name]: value
  		});
  	}

  	editHostMessage(){
  		this.setState({editView: true});
	}

	render () {
		return(
			<div className="eventmenu pagecontent">
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
					{(this.state.isHost && !this.state.editView) &&
                    	<div>
	                    	<p className="subheading">{this.state.hostMessage}</p>
	                    	<div className="edit" onClick={this.editHostMessage}> edit </div>
                		</div>
                	}
                	{!this.state.isHost &&
	                	<p className="subheading">{this.state.hostMessage}</p>
                	}
                	{this.state.editView &&
                		<div>
                			<form onSubmit={this.handleSubmit}>
	                            <input name="hostMessage" className="formitem" value={this.state.hostMessage}
	                                   onChange={this.handleChange} type="text"
	                                   maxLength="30" required/>
	                            <button id="button" type="submit" className="submitbutton" value="Submit">Save</button>
                        	</form>
                		</div>
                	}
				</div>

		    </div>
		);
	}
}